
import * as moment from 'moment';
export class NotificationService {
    courseEventList = [
        {
            id: '123',
            teacher: '马云',
            courseName: '钢琴一班',
            alartTime: new Date('2019-05-12 23:18').getTime()
        },
        {
            id: '222',
            teacher: '马化腾',
            courseName: '钢琴二班',
            alartTime: new Date('2019-05-12 23:08').getTime()
        }
    ];
    alartList = null;

    constructor() {
        setInterval(() => {
            const filter = this.courseEventList.filter((x) => {
                const nowDate = new Date();
               return x.alartTime === (Math.floor(nowDate.getTime() / 1000) * 1000 - nowDate.getSeconds() * 1000);
            });
            if (filter.length > 0) {
                filter.forEach((x) => {
                    this.addToAlartList(x);
                });
            }
        }, 1000); // 每秒钟检测是否应该触发事件
    }

    addToAlartList(courseEvent) {
        if (!this.alartList) { this.alartList = []; }
        this.alartList.filter(x => x.id === courseEvent.id).length === 0 && this.alartList.push({
            id: courseEvent.id,
            teacher: courseEvent.teacher,
            courseName: courseEvent.courseName
        });
    }

    removeFromAlartList(id) {
        this.alartList = this.alartList.filter(x => x.id != id);
        if (this.alartList.length === 0) {
            this.alartList = null;
        }
    }
}

