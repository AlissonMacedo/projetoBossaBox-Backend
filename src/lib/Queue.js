//* 
// port Bee from 'bee-queue';
// port CancellationMail from '../app/jobs/CancellationMail';
// port redisConfig from '../config/redis';
//
// nst jobs = [CancellationMail];
//
// ass Queue {
// constructor() {
//  this.queues = {};
//
//  this.init();
// }
//
// init() {
//  jobs.forEach(({ key, handle }) => {
//    this.queues[key] = {
//      bee: new Bee(key, {
//        redis: redisConfig,
//      }),
//      handle,
//    };
//  });
// }
//
// add(queue, job) {
//  return this.queues[queue].bee.createJob(job).save();
// }
//
// processQueue() {
//  jobs.forEach(job => {
//    const { bee, handle } = this.queues[job.key];
//
//    bee.on('failed', this.handleFailure).process(handle);
//  });
// }
//
// handleFailure(job, err) {
//  console.log(`Queue ${job.queue.name}: FAILED`, err);
// }
//
//
// port default new Queue();
//
