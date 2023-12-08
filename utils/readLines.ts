import fs from 'fs'

const readLines = (path: string) => {
    return fs.readFileSync(path, 'utf-8')
        .split("\n")
        .filter(line => line != "")
}

export default readLines

