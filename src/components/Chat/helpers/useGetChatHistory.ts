import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import useStore from '../../../store';
import { ChatServices } from '../../../services/chatServices';
import { ChatHistoryResponse } from '../../../services/chatServices/types';
import { showErrorToast } from '../../../helpers/showErrorToast';

export function useGetChatHistory(chatId: string) {
  const [chatHistory, setChatHistory] = useState<ChatHistoryResponse[]>();

  const { idInstance, apiTokenInstance } = useStore((store) => store);

  const { isLoading, mutateAsync } = useMutation(ChatServices.geChatHistory);

  useEffect(() => {
    const getChatHistory = async () => {
      if (!chatId) return;

      try {
        const response = await mutateAsync({
          idInstance,
          apiTokenInstance,
          body: {
            chatId,
            count: 100,
          },
        });

        if (response) {
          const filtered = response.filter((it) => !!it.idMessage);
          const sortByTime = filtered.sort((a, b) => a.timestamp - b.timestamp);
          setChatHistory(sortByTime);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        showErrorToast(err?.data?.message || err?.message);
      }
    };

    getChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return { chatHistory, isLoading };
}
