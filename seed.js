const db = require('./server/db/')
const User = require('./server/db/model/user');

async function seed() {
    await db.sync({ force: true })
    console.log('db synced!')
    await User.create({ email: 'cody@email.com',password:"w2w2" })
    // .then(data => data.createPool({ name: "hz" })).then(d => { console.log(d) });
    
}

async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.error(err)
        process.exitCode = 1
    }
    db.close();
}

runSeed()


