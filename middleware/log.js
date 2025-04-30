import morgan from "morgan";
import chalk from "chalk";

const loggerBasic = morgan("dev");

const loggerCustom = morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const params = JSON.stringify(req.params);
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const responseTime = tokens['response-time'](req, res);
    const date = new Date().toISOString();

    
    let log = "";
    // Cambio de colores
    if (method === "GET") log += `${chalk.blue("➜")} ${chalk.blue(method)} ${chalk.blue(url)} ${chalk.blue(status)} \n`;
    if (method === "POST") log += `${chalk.red("➜")} ${chalk.red(method)} ${chalk.red(url)} ${chalk.red(status)} \n`;
    if (method === "PUT") log += `${chalk.yellow("➜")} ${chalk.yellow(method)} ${chalk.yellow(url)} ${chalk.yellow(status)} \n`;
    if (method === "DELETE") log += `${chalk.magenta("➜")} ${chalk.magenta(method)} ${chalk.magenta(url)} ${chalk.magenta(status)} \n`;
    log += `${responseTime}ms ${date} \n`;
    log += `IP: ${ip} \n`;
    log += `User-Agent: ${userAgent} \n`;
    log += `Params: ${params} \n`;
    log += `Body: ${body} \n`;
    log += `Query: ${query}`;
    return log;
});

export { loggerBasic, loggerCustom };