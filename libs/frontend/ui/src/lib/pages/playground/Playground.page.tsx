import { Button, Flex, FormControl, Input, Select, Spacer } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useEventsQuery } from '@tracelytics/frontend/application';
import { TrackableEvent } from '@tracelytics/shared/types';
import dayjs from 'dayjs';

import { Field, Formik } from 'formik';
import { Dashboard } from '../../generic';

type SelectOption = {
    value: TrackableEvent;
    label: string;
};

export const PlaygroundPage = () => {
    const { events } = useEventsQuery();
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
                            eventId: '',
                            timestamp: dayjs().format('YYYY-MM-DD'),
                        }}
                        onSubmit={values => {
                            // createMutation.mutate({
                            //     ...values,
                            //     duration: Number(values.duration),
                            //     trainingDate: dayjs(values.trainingDate, DATETIME_FORMAT).toDate(),
                            //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            //     userId: currentUserId,
                            // });
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
                                                onChange={selection => {}}
                                                bg={'gray.50'}
                                                textColor={'gray.800'}
                                                iconColor={'gray.800'}
                                                shadow={'md'}
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
                                                name="eventDate"
                                                id="eventDate"
                                                type="date"
                                                shadow={'md'}
                                            />
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            // isLoading={createMutation.isLoading}
                                            bg={'blue.500'}
                                        >
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
