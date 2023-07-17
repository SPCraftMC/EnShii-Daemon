const date = () => {
    return "["
            + new Intl.DateTimeFormat("zh", { dateStyle: "short" }).format()
            + "#"
            + new Intl.DateTimeFormat("zh", { timeStyle: "long" }).format()
            + "]"
}

module.exports = {
    info: (s) => {
        console.log(date() + "\x1B[32m[INFO]\x1B[0m" + s);
    },
    warn: (s) => {
        console.warn(date() + "\x1B[33m[WARN]\x1B[0m" + s)
    },
    error: (s) => {
        console.error(date() + "\x1B[31m[ERROR]\x1B[0m" + s);
    }
};
