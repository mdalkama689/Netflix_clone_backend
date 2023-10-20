import bcrypt from 'bcrypt'

async function encryptPassword(password, saltRounds) {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export default encryptPassword