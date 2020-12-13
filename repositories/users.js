import fs from 'fs';
import crypto from 'crypto';

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename)
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }

    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename), {
            encoding: 'utf8',
        });
    }

    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
    //find the given id in the user.json file;
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();
        const filterRecords = records.filter(record => record.id !== id);
        await this.writeAll(filterRecords)
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

    }

}

const test = async () => {
    const repo = new UsersRepository('users.json');
    await repo.delete('23da948b');

};

test();
