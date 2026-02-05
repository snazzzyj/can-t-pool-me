/**
 * Collision detection - re-exports from utils for hook API.
 * Actual checks are used inside useShootTheLabubu.
 */

export {
  checkBulletLabubuCollision,
  checkBucketBodyCollision,
  checkLabubuReachedShooterLine,
} from '../utils/collision';
