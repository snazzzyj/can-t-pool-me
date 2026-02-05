/**
 * Collision detection helpers - AABB and hitbox checks
 */

import type { BulletEntity, FallingBodyEntity, LabubuEntity } from '../types';
import {
  BULLET_SIZE,
  LABUBU_SIZE,
  BUCKET_WIDTH,
  BUCKET_FORGIVENESS,
  BUCKET_HEIGHT,
  SHOOTER_LINE_Y,
} from '../constants';

export function checkBulletLabubuCollision(
  bullet: BulletEntity,
  labubu: LabubuEntity
): boolean {
  if (!labubu.isAlive || labubu.isDying || labubu.isFalling) return false;
  return (
    bullet.position.x < labubu.position.x + LABUBU_SIZE &&
    bullet.position.x + BULLET_SIZE > labubu.position.x &&
    bullet.position.y < labubu.position.y + LABUBU_SIZE &&
    bullet.position.y + BULLET_SIZE > labubu.position.y
  );
}

export function checkBucketBodyCollision(
  bucketX: number,
  bucketY: number,
  body: FallingBodyEntity
): boolean {
  const halfWidth = (BUCKET_WIDTH + BUCKET_FORGIVENESS * 2) / 2;
  const left = bucketX - halfWidth;
  const right = bucketX + halfWidth;
  return (
    body.position.x + LABUBU_SIZE > left &&
    body.position.x < right &&
    body.position.y + LABUBU_SIZE > bucketY &&
    body.position.y < bucketY + BUCKET_HEIGHT
  );
}

export function checkLabubuReachedShooterLine(labubu: LabubuEntity): boolean {
  if (!labubu.isAlive || labubu.isDying || labubu.isFalling) return false;
  return labubu.position.y + LABUBU_SIZE >= SHOOTER_LINE_Y;
}
