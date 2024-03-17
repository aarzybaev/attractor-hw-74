import {promises as fs} from 'fs';
import {Message} from './types';


const fileHandler = {
  path: './messages/',
  async saveMessage ({message, datetime}: Message) {
    const fileName = this.path + datetime + '.txt';
    const data = {message};
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
  async getMessages () {
    const files = await fs.readdir(this.path);
    let data: Message[] = [];

    for (const file of files.slice(-5)) {
      const message = await this.readMessage(file);
      data.push(message);
    }
    return data;
  },
  async readMessage(fileName: string) {
    try {
      const fileContents = await fs.readFile(this.path + fileName);
      return JSON.parse(fileContents.toString());
    }
    catch (e) {
      console.error('Error read file');
    }
  },
};

export default fileHandler;