import fs from 'fs';
import path from 'path';

const causesFile = path.resolve(process.cwd(), 'causes.json');

function readCauses() {
  if (!fs.existsSync(causesFile)) return [];
  return JSON.parse(fs.readFileSync(causesFile, 'utf-8'));
}

function writeCauses(causes) {
  fs.writeFileSync(causesFile, JSON.stringify(causes, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(readCauses());
  } else if (req.method === 'POST') {
    const causes = readCauses();
    causes.push(req.body);
    writeCauses(causes);
    res.status(201).json({ success: true });
  } else {
    res.status(405).end();
  }
} 