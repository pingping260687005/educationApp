import { MyExpress } from './express';
  import * as $mysql from 'mysql';
  import {connction} from './sql'; //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
  

module.exports.start = function () {
     // open connection
this.$sql = $mysql.createConnection(connction.mysql);       // 创建一个连接        mysql是我们上面文件暴露出来的模板的方法
this.$sql.connect();       // 运用了这句才是真正连接
const app = new MyExpress();
app.initExpress();
    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      const server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Context Root:    ' + config.contextRoot));
      console.log(chalk.green('Database:        ' + config.db.uri));
      // console.log(chalk.green('App version:     ' + config.meanjs.version));
      // if (config.meanjs['meanjs-version'])
      // console.log(chalk.green('MEAN.JS version: ' + config.meanjs['meanjs-version']));
      console.log('--');
    });
};
