import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CreateEventDto, RegisterEventDto, TrackableEvent, TrackableEventSchema } from '@tracelytics/shared/types';
import dayjs from 'dayjs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { EventsService } from './events.service';
import { RegisteredEvent, RegisteredEventSchema } from './registered-event.schema';

describe('AppService', () => {
    const eventNameStub = 'Test Event';
    const createDtoStub: CreateEventDto = { name: eventNameStub };
    const registerDtoStub: RegisterEventDto = { timestamp: dayjs().toISOString() };

    let service: EventsService;
    let mongodb: MongoMemoryServer;
    let mongoConnection: Connection;
    let trackableEventModel: Model<TrackableEvent>;
    let registeredEventModel: Model<RegisteredEvent>;

    beforeEach(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        mongoConnection = (await connect(uri)).connection;
        trackableEventModel = mongoConnection.model(TrackableEvent.name, TrackableEventSchema);
        registeredEventModel = mongoConnection.model(RegisteredEvent.name, RegisteredEventSchema);

        const module = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: getModelToken(TrackableEvent.name),
                    useValue: trackableEventModel,
                },
                {
                    provide: getModelToken(RegisteredEvent.name),
                    useValue: registeredEventModel,
                },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    afterEach(() => {
        mongoConnection.close();
        mongodb.stop();
    });

    it('creates event', async () => {
        const event = await service.create(createDtoStub);

        expect(event).toEqual({ id: expect.any(String), ...createDtoStub });
    });

    it('does not create event with existing name', async () => {
        await service.create(createDtoStub);

        const createFn = async () => await service.create(createDtoStub);

        await expect(createFn).rejects.toThrow();
    });

    it('finds all events', async () => {
        const createDto2Stub = { name: 'Test Event2' };

        await Promise.all([service.create(createDtoStub), service.create(createDto2Stub)]);

        expect(await service.findAll()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: expect.any(String), ...createDtoStub }),
                expect.objectContaining({ id: expect.any(String), ...createDto2Stub }),
            ]),
        );
    });

    it('deletes event', async () => {
        const createdEvent = await service.create(createDtoStub);

        await service.delete(createdEvent.id);

        expect((await service.findAll()).length).toBe(0);
    });

    it('throws on delete for non-existing event', async () => {
        const deleteFn = async () => await service.delete('non-existing-name');

        await expect(deleteFn).rejects.toThrow();
    });

    it('updates event', async () => {
        const createdEvent = await service.create(createDtoStub);
        const dto2Stub = { name: 'Test Event2' };

        const updatedEvent = await service.update(createdEvent.id, dto2Stub);

        expect(updatedEvent).toEqual(expect.objectContaining({ ...dto2Stub }));
    });

    it('throws on update for non-existing event', async () => {
        const updateFn = async () => await service.update('non-existing-name', createDtoStub);

        await expect(updateFn).rejects.toThrow();
    });

    it('registers created event', async () => {
        const createdEvent = await service.create(createDtoStub);

        const registeredEvent = await service.register(createdEvent.id, registerDtoStub);

        expect(registeredEvent).toEqual({ trackableEventId: createdEvent.id, ...registerDtoStub });
    });

    it('does not register non-existing event', async () => {
        const registerFn = async () => await service.register(eventNameStub, registerDtoStub);

        await expect(registerFn).rejects.toThrow();
    });

    it('gets registered events from period', async () => {
        const createDto2Stub = { name: 'Test Event2' };
        const createdEvent = await service.create(createDtoStub);
        const createdEvent2 = await service.create(createDto2Stub);

        await service.register(createdEvent.id, { timestamp: dayjs('2021-01-01').toISOString() });
        await service.register(createdEvent.id, { timestamp: dayjs('2021-01-02').toISOString() });
        await service.register(createdEvent2.id, { timestamp: dayjs('2021-01-02').toISOString() });
        await service.register(createdEvent2.id, { timestamp: dayjs('2021-01-03').toISOString() });

        const registeredEvents = await service.getRegisteredEventsFromPeriod(dayjs('2021-01-02'), dayjs('2021-01-03'));

        expect(registeredEvents).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: createdEvent.id, count: 1 }),
                expect.objectContaining({ id: createdEvent2.id, count: 2 }),
            ]),
        );
    });
});
