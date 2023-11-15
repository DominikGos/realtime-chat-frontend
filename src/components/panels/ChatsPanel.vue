<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import PanelScrollBar from './PanelScrollBar.vue';
import { computed, ref, watch } from 'vue';
import { store } from '@/store';
import ChatService from '@/services/ChatService';
import type Chat from '@/interfaces/Chat';
import type User from '@/interfaces/User';
import type Message from '@/interfaces/Message';

const chatService: ChatService = new ChatService;
const chats = ref<Chat[]>([]);
const loading = ref(false);
let offset: number = 0;

watch(
  () => store.state.broadcastedData.newMessage,
  (newMessageResource?: Message) => {
    if (!newMessageResource)
      return;

    let chatWithNewMessageIndex: number | undefined;

    chats.value.forEach((chat: Chat, index: number) => {
      if (chat.id === newMessageResource.chat!.id) {
        chatWithNewMessageIndex = index;
        const chatWithNewMessage: Chat = newMessageResource.chat!
        chatWithNewMessage.last_message = newMessageResource

        if (store.state.auth.user?.id != newMessageResource.user?.id) {
          const chatUnreadMessages: number = chat.unread_messages ?? 0;
          chatWithNewMessage.unread_messages = chatUnreadMessages;
          chatWithNewMessage.unread_messages++;
        }

        chats.value.splice(index, 1);
        chats.value.unshift(chatWithNewMessage)
      }
    })

    if (typeof chatWithNewMessageIndex !== 'number') {
      const chatWithNewMessage: Chat = newMessageResource.chat!
      chatWithNewMessage.last_message = newMessageResource
      chatWithNewMessage.unread_messages = 0;
      chatWithNewMessage.unread_messages++;
      chats.value.unshift(chatWithNewMessage)
    }
  }
)

watch(
  () => store.state.broadcastedData.removedMessage,
  (removedMessageResource?: Message) => {
    if (!removedMessageResource)
      return;

    chats.value.forEach((chat: Chat, index: number) => {
      if (chat.id === removedMessageResource.chat!.id) {
        const chatWithRemovedMessage: Chat = chat;
        chatWithRemovedMessage.last_message = {
          user: removedMessageResource.user,
          text: 'Removed message.',
          files_links: [],
          created_at: removedMessageResource.created_at,
        };

        chats.value[index] = chatWithRemovedMessage;
      }
    })
  }
)

watch(
  () => store.state.broadcastedData.updatedUser,
  (updatedUserResource?: User) => {
    if (!updatedUserResource)
      return;

    chats.value.forEach((chat: Chat, index: number) => {
      chat.users.forEach((user: User, userIndex: number) => {
        if (user.id === updatedUserResource.id) {
          chats.value[index].users[userIndex] = updatedUserResource;
        }
      })
    })
  }
)

async function loadChats(start: number): Promise<void> {
  loading.value = true;

  await chatService.getChats(start);

  loading.value = false;
  chats.value = [...chats.value, ...chatService.data.chats];
}

function getFriend(chatMembers: User[]): User {
  const friend: User = chatMembers.filter((user) => {
    return user.id != store.state.auth.user?.id;
  })[0];

  return friend;
}

const chatList = computed<Chat[]>(() => {
  let chatList: Chat[] = chats.value.filter((chat) => {
    return chat.last_message;
  })

  return chatList;
})

function lastMessage(message: Message): string {
  let lastMessage: string = '';
  let authorName: string = message.user.id == store.state.auth.user?.id
    ? 'you'
    : `${message.user.first_name} ${message.user.last_name}`;

  if (message.text)
    lastMessage = `${authorName}: ${message.text}`
  else if (message.files_links.length > 0)
    lastMessage = `${authorName}: sent files(${message.files_links.length})`

  return lastMessage;
}

async function setChat(chat: Chat): Promise<void> {
  if(chatHasUnreadMessages(chat)) {
    readMessages(chat);
  }

  store.commit('setChat', chat);
}

function chatHasUnreadMessages(chat: Chat): boolean {
  return (chat.unread_messages && chat.unread_messages > 0) as boolean;
}


async function readMessages(chat: Chat): Promise<void> {
  await chatService.destroyUnreadMessages(chat.id);

  if (!chatService.errors) {
    chat.unread_messages = 0;
  }
}


await loadChats(offset);
</script>

<template>
  <PanelScrollBar>
    <TransitionGroup name="list">
      <PanelItem v-for="chat in chatList" :key="chat.id" @click="setChat(chat)"
        :active="chat?.id == store.state.components.chat?.id">
        <template v-slot:start>
          <Avatar :size="'medium'" :active="getFriend(chat.users)?.signed_in"
            :avatar="getFriend(chat.users)?.avatar_link" />
        </template>
        <template v-slot:middle>
          <p class="truncate w-[calc(100%-60px)]">
            {{ getFriend(chat.users)?.first_name }}
            {{ getFriend(chat.users)?.last_name }}
          </p>
          <p :class="[chatHasUnreadMessages(chat) ? 'text-cyan-400' : 'text-gray-400', ' truncate w-[calc(100%-60px)]']">
            {{ lastMessage(chat.last_message!) }}
          </p>
        </template>
        <template v-slot:end>
          <div class="flex flex-col">
            <p class="text-xs">{{ chat.last_message?.created_at }}</p>
            <div class="h-full flex items-center justify-end">
              <div v-if="chatHasUnreadMessages(chat)"
                class="flex items-center justify-center bg-cyan-400 w-4 h-4 rounded-full text-white text-xs">
                <p v-if="chat.unread_messages && chat.unread_messages >= 10">9+</p>
                <p v-else>{{ chat.unread_messages }}</p>
              </div>
            </div>
          </div>
        </template>
      </PanelItem>
    </TransitionGroup>
    <p v-if="(!loading) && chatList.length === 0" class="text-sm text-center">You have no any conversations.</p>
  </PanelScrollBar>
</template>