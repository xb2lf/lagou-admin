/* import SMERouter from 'sme-router'; */
import gp21Router from 'gp21-router'
import index from '../controllers/index';
import listUser from '../controllers/users/list-user';
import listPositions from '../controllers/positions/list-position';
import signin from '../controllers/signin';
import { auth as authModel } from '../models/auth';

/* const router = new SMERouter('root'); */
const router = new gp21Router('root');

// 路由守卫
router.use(async (req, res, next) => {
  const url = req.url;
  const result = await authModel();
  if (result.ret) {
    router.go(url)
  } else {
    router.go('/signin')
  }
})
// route config
/* router.route('/', (req, res, next) => { }) */

router.route('/signin', signin(router))

router.route('/index', index(router))

router.route('/index/users', listUser(router))

router.route('/index/positions', listPositions(router))

router.route('*', (req, res, next) => {
  res.redirect('/index/users')
})



export default router