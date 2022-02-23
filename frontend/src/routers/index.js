import SMERouter from 'sme-router';
import index from '../controllers/users/index';
import signin from '../controllers/signin';
import { auth as authModel } from '../models/auth';

const router = new SMERouter('root')

// 路由守卫
router.use(async (req, res, next) => {
  const result = await authModel();
  if (result.ret) {
    router.go('/index')
  } else {
    router.go('/signin')
  }
})
// route config
router.route('/', (req, res, next) => { })

router.route('/signin', signin(router))

router.route('/index', index(router))

/* router.route('*', (req, res, next) => {
  res.redirect('/')
}) */



export default router