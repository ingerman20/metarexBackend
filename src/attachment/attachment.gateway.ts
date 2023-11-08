import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
})
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Подключен клиент: ', socket.id);
    });
  }

  @SubscribeMessage('sendFiles')
  getFiles(@MessageBody() body: any) {
    const img = Buffer.from(body[0]).toString('base64');

    this.server.emit('returnDataToClient', {
      data: img,
    });
  }
}
