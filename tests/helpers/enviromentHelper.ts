export function getEnv() {
    return process.env.testEnv ? process.env.testEnv : 'QA'
}