import { Button, Flex, FormControl, Input, Select, Spacer, useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useTracelytics } from '@tracelytics/emitter';
import { useEventsQuery } from '@tracelytics/frontend/application';
import dayjs from 'dayjs';

import { Field, Formik } from 'formik';
import { useState } from 'react';
import { Dashboard, toastError } from '../../generic';

export const PlaygroundPage = () => {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const { events } = useEventsQuery();
    const { emitEvent } = useTracelytics();
    const toast = useToast();

    const getSelectOptions = () => {
        if (!events) {
            return null;
        }

        return events.map(event => (
            <option key={event.id} value={event.id}>
                {event.name}
            </option>
        ));
    };

    return (
        <Dashboard>
            <Spacer />
            <Flex direction={'column'} alignItems={'center'} w={'full'}>
                <Flex alignItems={'center'}>
                    <Formik
                        initialValues={{
                            timestamp: dayjs().format('YYYY-MM-DD'),
                        }}
                        onSubmit={values => {
                            console.log('values', values.timestamp, selectedEventId);
                            if (!selectedEventId || !dayjs(values.timestamp).isValid()) {
                                toastError(toast, 'Invalid input');
                            } else {
                                emitEvent(selectedEventId, dayjs(values.timestamp));
                            }
                        }}
                    >
                        {({ handleSubmit }: { handleSubmit: any }) => (
                            <form onSubmit={handleSubmit}>
                                <Flex direction={'column'}>
                                    <Flex gap={3} alignItems={'center'}>
                                        <FormControl w={'300px'}>
                                            <Select
                                                rounded={'full'}
                                                name={'events'}
                                                placeholder={'Select event'}
                                                onChange={selection => {
                                                    setSelectedEventId(selection.target.value);
                                                }}
                                                bg={'gray.50'}
                                                textColor={'gray.800'}
                                                iconColor={'gray.800'}
                                                shadow={'md'}
                                                disabled={!events}
                                            >
                                                {getSelectOptions()}
                                            </Select>
                                        </FormControl>

                                        <FormControl w={'200px'}>
                                            <Field
                                                rounded={'full'}
                                                textColor={'gray.800'}
                                                css={css`
                                                    ::-webkit-calendar-picker-indicator {
                                                        background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png)
                                                            center/80% no-repeat;
                                                        color: black;
                                                    }
                                                `}
                                                as={Input}
                                                name="timestamp"
                                                id="timestamp"
                                                type="date"
                                                shadow={'md'}
                                                disabled={!events}
                                            />
                                        </FormControl>

                                        <Button type="submit" bg={'blue.500'} isDisabled={!events}>
                                            Emit
                                        </Button>
                                    </Flex>
                                </Flex>
                            </form>
                        )}
                    </Formik>
                </Flex>
            </Flex>
            <Spacer />
        </Dashboard>
    );
};
