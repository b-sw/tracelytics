import { Endpoint, QueryKey } from '@tracelytics/frontend/domain';
import { CreateEventDto, TrackableEvent } from '@tracelytics/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const useEventsMutation = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = async () => {
        [QueryKey.Events].map(async key => await queryClient.invalidateQueries({ queryKey: [key] }));
    };

    const createEvent = async (args: CreateEventDto): Promise<TrackableEvent> => {
        const response = await axios.post(Endpoint.Events, args);

        return response.data;
    };

    const deleteEvent = async (args: { eventName: string }): Promise<void> => {
        await axios.delete(`${Endpoint.Events}/${args.eventName}`);
    };

    const updateEvent = async (args: { eventName: string; dto: CreateEventDto }): Promise<TrackableEvent> => {
        const response = await axios.put(`${Endpoint.Events}/${args.eventName}`, args.dto);

        return response.data;
    };

    const createMutation = useMutation(createEvent, {
        onSuccess: async _ => await invalidateQueries(),
    });

    const deleteMutation = useMutation(deleteEvent, {
        onSuccess: async _ => await invalidateQueries(),
    });

    const updateMutation = useMutation(updateEvent, {
        onSuccess: async _ => await invalidateQueries(),
    });

    return { createMutation, deleteMutation, updateMutation };
};
