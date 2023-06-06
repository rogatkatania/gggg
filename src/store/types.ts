import { ContactInfo } from '../services/accountServices/types';

export interface InitialState {
  isLoggedIn: boolean;
  idInstance: string;
  apiTokenInstance: string;
  currentUser: ContactInfo | null;
  setCurrentUser: (value: ContactInfo) => void;
  setCredentials: (value: CredentialValues) => void;
  setChatContact: (value: ChatContact) => void;
  chatContacts: ChatContact[];
  currentChat: string;
  setCurrentChat: (value: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface CredentialValues {
  idInstance: string;
  apiTokenInstance: string;
  isLoggedIn: boolean;
}

export enum AccountStatuses {
  AUTHORIZED = 'authorized',
  NOT_AUTHORIZED = 'notAuthorized',
  BLOCKED = 'blocked',
  SLEEP_MODE = 'sleepMode',
  STARTING = 'starting',
}

export enum ChatContactType {
  USER = 'user',
  GROUP = 'group',
}

export interface ChatContact {
  chatId: string;
  phone: number;
}
