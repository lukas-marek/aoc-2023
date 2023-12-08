import fs from 'fs'

const readBlocks = (path: string) => {
    return fs.readFileSync(path, 'utf-8')
        .split("\n\n")
        .filter(line => line != "")
}

export default readBlocks

