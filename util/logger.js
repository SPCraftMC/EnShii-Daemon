const date = "["
            + new Intl.DateTimeFormat("zh", { dateStyle: "short" }).format()
            + "#"
            + new Intl.DateTimeFormat("zh", { timeStyle: "long" }).format()
            + "]"

module.exports = {
    info: (s) => {
        console.log(date + "[INFO] " + s);
    },
    warn: (s) => {
        console.warn(date + "[WARN] " + s)
    },
    error: (s) => {
        console.error(date + "[ERROR] " + s);
    }
};
