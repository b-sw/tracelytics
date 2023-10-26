import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useEventsMutation } from '@tracelytics/frontend/application';
import { TrackableEvent } from '@tracelytics/shared/types';
import { useEffect } from 'react';
import { TableItems, toastError, toastSuccess } from '../../../generic';
import { EventListItem } from '../Event.list-item';

type Props = {
    event: TrackableEvent;
    isOpen: boolean;
    onClose: () => void;
};

export const RemoveEventModal = ({ event, isOpen, onClose }: Props) => {
    const { deleteMutation } = useEventsMutation();
    const toast = useToast();

    useEffect(() => {
        if (deleteMutation.isError) {
            toastError(toast, 'Error deleting event');
        }

        if (deleteMutation.isSuccess) {
            onClose();
            toastSuccess(toast, 'Event deleted');
        }
    }, [deleteMutation.status]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent bg={'none'}>
                <ModalBody>
                    <Flex direction={'column'} gap={3}>
                        <Text fontWeight={'bold'} color={'gray.50'}>
                            Are you sure you want to delete the following event?
                        </Text>
                        <TableItems>
                            <EventListItem event={event} />
                        </TableItems>
                        <Text fontWeight={'bold'} color={'gray.50'}>
                            You can't undo this action afterwards.
                        </Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Spacer />

                    <Button onClick={onClose} bg={'gray.400'}>
                        Cancel
                    </Button>
                    <Button
                        bg={'red.500'}
                        textColor={'gray.50'}
                        onClick={() => deleteMutation.mutate(event.id)}
                        isLoading={deleteMutation.isLoading}
                        ml={3}
                    >
                        Delete
                    </Button>

                    <Spacer />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
