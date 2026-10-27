CREATE TABLE users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT,pw_hash TEXT,created_at INTEGER NOT NULL);
CREATE TABLE sessions(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires_at INTEGER NOT NULL);
CREATE TABLE chats(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),title TEXT NOT NULL,updated_at INTEGER NOT NULL);
CREATE INDEX idx_chats_user ON chats(user_id,updated_at DESC);
CREATE TABLE messages(id INTEGER PRIMARY KEY AUTOINCREMENT,chat_id TEXT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,user_id TEXT NOT NULL,role TEXT NOT NULL,content TEXT NOT NULL,created_at INTEGER NOT NULL);
CREATE INDEX idx_msg_chat ON messages(chat_id,id);
-- Schema only (no API/UI yet):
CREATE TABLE preferences(user_id TEXT PRIMARY KEY REFERENCES users(id),data TEXT NOT NULL DEFAULT '{}');
CREATE TABLE tasks(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),title TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'open',result TEXT,created_at INTEGER NOT NULL);
CREATE TABLE files(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),name TEXT NOT NULL,r2_key TEXT,mime TEXT,size INTEGER,created_at INTEGER NOT NULL);
