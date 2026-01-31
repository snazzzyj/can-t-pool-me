
import { Round, PlayerKey } from './types';

export const PLAYER_ORDER: PlayerKey[] = ['debbie', 'elyse', 'joel', 'rab', 'jenn'];

export const PLAYER_DISPLAY_NAMES: Record<PlayerKey, string> = {
  rab: 'Rab (Sharker)',
  elyse: 'Elyse (Big Iron McGee)',
  debbie: 'Debbie (.pxl)',
  jenn: 'Jenn (Hacktress)',
  joel: 'Joel (Hackerman)',
};

export const ROUNDS_DATA: Round[] = [
  {
    id: 1,
    title: 'BASIC INTRUSION',
    commands: [
      { text: 'sudo find mushi --location', timeLimit: 30 },
      { text: 'grep villain /database/records', timeLimit: 30 },
      { text: 'cat /secrets/hideout.txt', timeLimit: 30 },
      { text: 'ls -la /villain/base', timeLimit: 30 },
      { text: 'ping -c 4 villain.server', timeLimit: 30 },
    ],
  },
  {
    id: 2,
    title: 'DEEP DIVE',
    commands: [
      { text: 'ssh root@villain-server.evil', timeLimit: 25 },
      { text: 'decrypt /files/mushi_location.enc', timeLimit: 25 },
      { text: 'nmap -sV 192.168.1.666', timeLimit: 25 },
      { text: 'openssl aes-256-cbc -d', timeLimit: 25 },
      { text: 'traceroute -m 30 evil.corp', timeLimit: 25 },
    ],
  },
  {
    id: 3,
    title: 'MAINFRAME BREACH',
    commands: [
      { text: 'rm -rf /villain/security_logs', timeLimit: 20 },
      { text: 'curl https://evil.corp/api/prisoners', timeLimit: 20 },
      { text: 'sudo chmod 777 /mainframe/access', timeLimit: 20 },
      { text: 'killall -9 villain_process', timeLimit: 20 },
      { text: 'shutdown -h now "SUCCESS"', timeLimit: 20 },
    ],
  },
];

export const MAX_LIVES = 9;
export const VILLAIN_ADDRESS = "420 Blaze It Rd. 6969 DeRailed Valley";
