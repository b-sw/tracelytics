import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import dayjs from 'dayjs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Event, EventSchema } from './event.schema';
import { EventsService } from './events.service';

describe('AppService', () => {
    const dtoStub = { name: 'Test Event', timestamp: dayjs().toISOString() };

    let service: EventsService;
    let mongodb: MongoMemoryServer;
    let mongoConnection: Connection;
    let eventModel: Model<Event>;

    beforeEach(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        mongoConnection = (await connect(uri)).connection;
        eventModel = mongoConnection.model(Event.name, EventSchema);

        const module = await Test.createTestingModule({
            providers: [EventsService, { provide: getModelToken(Event.name), useValue: eventModel }],
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    afterEach(() => {
        mongoConnection.close();
        mongodb.stop();
    });

    it('creates event', async () => {
        const event = await service.create(dtoStub);

        expect(event).toEqual(expect.objectContaining({ id: expect.any(String), ...dtoStub }));
    });

    it('finds event', async () => {
        const createdEvent = await service.create(dtoStub);

        const event = await service.find(createdEvent.id);

        expect(event).toEqual(expect.objectContaining({ id: expect.any(String), ...dtoStub }));
    });

    it('finds all event', async () => {
        const dto2Stub = { name: 'Test Event2', timestamp: dayjs().toISOString() };

        await Promise.all([service.create(dtoStub), service.create(dto2Stub)]);

        expect(await service.findAll()).toEqual([
            expect.objectContaining({ id: expect.any(String), ...dtoStub }),
            expect.objectContaining({ id: expect.any(String), ...dto2Stub }),
        ]);
    });

    it('deletes event', async () => {
        const createdEvent = await service.create(dtoStub);

        await service.delete(createdEvent.id);

        expect(await service.find(createdEvent.id)).toBeNull();
    });

    it('throws on delete for non-existing event', async () => {
        const deleteFn = async () => await service.delete('non-existing-id');

        await expect(deleteFn).rejects.toThrow();
    });

    it('updates widget', async () => {
        const createdEvent = await service.create(dtoStub);
        const dto2Stub = { name: 'Test Event2', timestamp: dayjs().toISOString() };

        const updatedEvent = await service.update(createdEvent.id, dto2Stub);

        expect(updatedEvent).toEqual(expect.objectContaining({ id: createdEvent.id, ...dto2Stub }));
    });

    it('throws on update for non-existing event', async () => {
        const updateFn = async () => await service.update('non-existing-id', dtoStub);

        await expect(updateFn).rejects.toThrow();
    });
});
