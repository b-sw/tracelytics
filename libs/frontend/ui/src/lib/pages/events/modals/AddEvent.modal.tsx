import {
    Button,
    Flex,
    FormControl,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    useToast,
} from '@chakra-ui/react';
import { useEventsMutation } from '@tracelytics/frontend/application';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { MdOutlineEditNote } from 'react-icons/md';
import { toastError, toastSuccess } from '../../../generic/toast';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

export const AddEventModal = ({ isOpen, handleClose }: Props) => {
    const { createMutation } = useEventsMutation();
    const toast = useToast();

    useEffect(() => {
        if (createMutation.isSuccess) {
            handleClose();
            toastSuccess(toast, 'Event added');
        }

        if (createMutation.isError) {
            toastError(toast, (createMutation.error as Error).message);
        }
    }, [createMutation.status]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent p={[5]} rounded={25}>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={values => {
                        createMutation.mutate({ ...values });
                    }}
                >
                    {({ handleSubmit }: { handleSubmit: any }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody p={0} mb={5}>
                                <Flex direction={'column'} gap={3}>
                                    <Flex alignItems={'center'} gap={1} w={'100%'}>
                                        <Flex w={'10%'}>
                                            <Icon as={MdOutlineEditNote} color={'gray.600'} boxSize={'30px'} />
                                        </Flex>

                                        <FormControl w={'90%'}>
                                            <Field
                                                rounded={'full'}
                                                as={Input}
                                                id="name"
                                                name="name"
                                                type="name"
                                                placeholder="e.g. Login button clicked"
                                            />
                                        </FormControl>
                                    </Flex>
                                </Flex>
                            </ModalBody>

                            <ModalFooter p={0}>
                                <Flex w={'100%'} gap={5}>
                                    <Spacer />

                                    <Button type="submit" isLoading={createMutation.isLoading} bg={'blue.500'}>
                                        Add
                                    </Button>

                                    <Button onClick={handleClose} bg={'gray.400'}>
                                        Cancel
                                    </Button>

                                    <Spacer />
                                </Flex>
                            </ModalFooter>
                        </form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
