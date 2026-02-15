import crypto from 'crypto';

// Usage:
//   node admin/encrypt-token.mjs "TOKEN" "PASSPHRASE"
//   echo TOKEN<newline>PASSPHRASE | node admin/encrypt-token.mjs --stdin
// Outputs a JSON blob you can paste into admin/admin.js as embeddedEncryptedToken.

let token = process.argv[2];
let pass = process.argv[3];

if (process.argv.includes('--stdin')) {
  const stdin = await new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (data += chunk));
    process.stdin.on('end', () => resolve(data));
  });
  const [t, p] = stdin.split(/\r?\n/);
  token = (t || '').trim();
  pass = (p || '').trim();
}

if (!token || !pass) {
  console.error('Usage: node admin/encrypt-token.mjs \"TOKEN\" \"PASSPHRASE\"');
  console.error('   or: echo TOKEN<newline>PASSPHRASE | node admin/encrypt-token.mjs --stdin');
  process.exit(1);
}

const iterations = 210000;
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

const key = crypto.pbkdf2Sync(Buffer.from(pass, 'utf8'), salt, iterations, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

const ciphertext = Buffer.concat([cipher.update(Buffer.from(token, 'utf8')), cipher.final()]);
const tag = cipher.getAuthTag();

// WebCrypto AES-GCM expects ciphertext||tag
const data = Buffer.concat([ciphertext, tag]);

const blob = {
  saltB64: salt.toString('base64'),
  ivB64: iv.toString('base64'),
  dataB64: data.toString('base64'),
  iterations,
};

console.log(JSON.stringify(blob, null, 2));
