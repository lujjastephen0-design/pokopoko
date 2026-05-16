<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>pokopoko</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A0A14; font-family: 'Nunito', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 4px; }

  #app {
    width: 100%;
    max-width: 420px;
    height: 100vh;
    max-height: 820px;
    background: #13131F;
    border-radius: 36px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
    position: relative;
  }

  /* SCREENS */
  .screen { display: none; flex-direction: column; height: 100%; }
  .screen.active { display: flex; }

  /* AUTH SCREEN */
  #auth-screen {
    background: linear-gradient(160deg, #0E0E2A 0%, #13131F 100%);
    align-items: center; justify-content: center; gap: 0; padding: 40px 30px;
  }
  .logo-big { font-size: 42px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .logo-big span { color: #4ECDC4; }
  .tagline { font-size: 13px; color: #555; font-weight: 700; margin-bottom: 48px; letter-spacing: 1px; }
  .auth-card { width: 100%; background: rgba(255,255,255,0.04); border-radius: 24px; padding: 28px; border: 1px solid rgba(255,255,255,0.06); }
  .auth-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .auth-sub { font-size: 13px; color: #555; font-weight: 600; margin-bottom: 24px; }
  .input-group { margin-bottom: 14px; }
  .input-label { font-size: 11px; color: #4ECDC4; font-weight: 800; letter-spacing: 1px; margin-bottom: 6px; display: block; }
  .poko-input {
    width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 13px 16px; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Nunito', sans-serif; outline: none; transition: border 0.2s;
  }
  .poko-input:focus { border-color: #4ECDC4; }
  .poko-input::placeholder { color: #333; }
  .poko-btn {
    width: 100%; padding: 14px; border: none; border-radius: 14px; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 900;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; box-shadow: 0 6px 20px rgba(78,205,196,0.35);
    transition: all 0.15s; margin-top: 6px;
  }
  .poko-btn:hover { transform: scale(1.02); filter: brightness(1.05); }
  .poko-btn:active { transform: scale(0.98); }
  .poko-btn.secondary { background: rgba(255,255,255,0.06); color: #fff; box-shadow: none; margin-top: 10px; }
  .error-msg { font-size: 12px; color: #FF6B6B; font-weight: 700; margin-top: 10px; text-align: center; min-height: 18px; }
  .auth-footer { font-size: 13px; color: #444; font-weight: 600; margin-top: 18px; text-align: center; cursor: pointer; }
  .auth-footer span { color: #4ECDC4; }

  /* LOADING */
  .spinner {
    width: 36px; height: 36px; border: 3px solid rgba(78,205,196,0.2);
    border-top-color: #4ECDC4; border-radius: 50%;
    animation: spin 0.8s linear infinite; margin: 0 auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* MAIN SCREEN */
  #main-screen { background: #13131F; }
  .main-header {
    padding: 48px 20px 14px;
    background: linear-gradient(180deg, #1A1A2E 0%, #13131F 100%);
    flex-shrink: 0;
  }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .logo-sm { font-size: 24px; font-weight: 900; color: #fff; }
  .logo-sm span { color: #4ECDC4; }
  .header-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 11px; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: 17px;
    transition: all 0.15s; background: rgba(255,255,255,0.06); color: #fff;
  }
  .icon-btn.teal { background: rgba(78,205,196,0.15); color: #4ECDC4; }
  .search-bar {
    display: flex; align-items: center; gap: 10;
    background: rgba(255,255,255,0.06); border-radius: 13px; padding: 10px 14px;
  }
  .search-bar input {
    background: none; border: none; outline: none; color: #fff;
    font-size: 14px; font-weight: 600; flex: 1; font-family: 'Nunito', sans-serif;
  }
  .search-bar input::placeholder { color: #333; }

  /* TABS */
  .tabs {
    display: flex; border-bottom: 1px solid rgba(255,255,255,0.05);
    background: #13131F; flex-shrink: 0;
  }
  .tab {
    flex: 1; padding: 11px 0; background: none; border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s;
    color: #444; border-bottom: 2px solid transparent;
  }
  .tab.active { color: #4ECDC4; border-bottom-color: #4ECDC4; }

  /* CONTACT LIST */
  .contacts-list { flex: 1; overflow-y: auto; }
  .contact-row {
    display: flex; align-items: center; gap: 13px;
    padding: 13px 18px; cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    transition: background 0.15s; animation: fadeUp 0.3s ease both;
  }
  .contact-row:hover { background: rgba(255,255,255,0.04); }
  .avatar {
    width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 900; color: #fff; position: relative;
  }
  .online-dot {
    position: absolute; bottom: 1px; right: 1px;
    width: 11px; height: 11px; border-radius: 50%;
    background: #4ECDC4; border: 2px solid #13131F;
  }
  .contact-info { flex: 1; min-width: 0; }
  .contact-name { font-size: 15px; font-weight: 800; color: #fff; }
  .contact-last { font-size: 12px; color: #555; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 3px; }
  .contact-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
  .contact-time { font-size: 11px; color: #444; font-weight: 700; }
  .unread-badge {
    min-width: 20px; height: 20px; border-radius: 10px;
    background: #4ECDC4; color: #0E0E1A;
    font-size: 10px; font-weight: 900;
    display: flex; align-items: center; justify-content: center; padding: 0 5px;
  }

  /* BOTTOM NAV */
  .bottom-nav {
    display: flex; justify-content: space-around;
    padding: 10px 0 22px;
    background: #1A1A2E; border-top: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .nav-btn {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    background: none; border: none; cursor: pointer;
    color: #444; transition: all 0.2s; font-family: 'Nunito', sans-serif;
    padding: 4px 16px;
  }
  .nav-btn.active { color: #4ECDC4; }
  .nav-btn .nav-icon { font-size: 22px; }
  .nav-btn .nav-label { font-size: 10px; font-weight: 800; }

  /* CHAT SCREEN */
  #chat-screen { background: #0E0E1A; }
  .chat-header {
    display: flex; align-items: center; gap: 11px;
    padding: 48px 14px 13px;
    background: #1A1A2E; flex-shrink: 0;
  }
  .back-btn { background: none; border: none; color: #4ECDC4; font-size: 22px; cursor: pointer; padding: 2px 8px 2px 0; }
  .chat-header-info { flex: 1; cursor: pointer; }
  .chat-header-name { font-size: 16px; font-weight: 800; color: #fff; }
  .chat-header-status { font-size: 12px; font-weight: 600; margin-top: 1px; }
  .chat-actions { display: flex; gap: 8px; }

  /* MESSAGES */
  .messages-area { flex: 1; overflow-y: auto; padding: 14px 13px; display: flex; flex-direction: column; gap: 7px; }
  .msg-wrap { display: flex; animation: fadeUp 0.2s ease; }
  .msg-wrap.me { justify-content: flex-end; }
  .msg-wrap.them { justify-content: flex-start; }
  .bubble {
    max-width: 72%; border-radius: 18px; padding: 10px 14px;
    font-size: 14px; font-weight: 600; line-height: 1.4;
  }
  .bubble.me {
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; border-bottom-right-radius: 4px;
    box-shadow: 0 4px 14px rgba(78,205,196,0.25);
  }
  .bubble.them {
    background: rgba(255,255,255,0.07); color: #ddd; border-bottom-left-radius: 4px;
  }
  .bubble-time { font-size: 10px; opacity: 0.55; margin-top: 4px; text-align: right; font-weight: 700; }
  .typing-bubble { display: flex; gap: 5px; align-items: center; padding: 12px 16px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #4ECDC4; }
  .dot:nth-child(1) { animation: blink 1.4s 0s infinite; }
  .dot:nth-child(2) { animation: blink 1.4s 0.2s infinite; }
  .dot:nth-child(3) { animation: blink 1.4s 0.4s infinite; }
  @keyframes blink { 0%,80%,100%{opacity:0.2;} 40%{opacity:1;} }

  /* INPUT BAR */
  .input-bar {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 13px 24px;
    background: #1A1A2E; border-top: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .msg-input {
    flex: 1; background: rgba(255,255,255,0.06); border: none; border-radius: 14px;
    padding: 11px 15px; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Nunito', sans-serif; outline: none;
  }
  .msg-input::placeholder { color: #333; }
  .send-btn {
    width: 42px; height: 42px; border-radius: 13px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(78,205,196,0.35); transition: all 0.15s;
  }
  .send-btn:hover { transform: scale(1.05); }

  /* EMOJI */
  .emoji-row {
    background: #1A1A2E; padding: 10px 14px;
    display: flex; flex-wrap: wrap; gap: 8px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .emoji-pick { background: none; border: none; font-size: 22px; cursor: pointer; transition: transform 0.1s; }
  .emoji-pick:hover { transform: scale(1.3); }

  /* ADD FRIEND SCREEN */
  #add-screen { background: #13131F; }
  .add-header { padding: 48px 20px 20px; background: #1A1A2E; flex-shrink: 0; display: flex; align-items: center; gap: 14px; }
  .add-header h2 { font-size: 20px; font-weight: 900; color: #fff; }
  .add-body { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 14px; }
  .add-result {
    display: flex; align-items: center; gap: 13px;
    background: rgba(255,255,255,0.04); border-radius: 16px; padding: 14px 16px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .add-result-info { flex: 1; }
  .add-result-name { font-size: 15px; font-weight: 800; color: #fff; }
  .add-result-email { font-size: 12px; color: #555; font-weight: 600; margin-top: 2px; }
  .add-btn {
    padding: 9px 18px; border-radius: 11px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; font-size: 13px; font-weight: 900; font-family: 'Nunito', sans-serif;
  }

  /* PROFILE SCREEN */
  #profile-screen { background: #13131F; }
  .profile-header { padding: 48px 20px 20px; background: #1A1A2E; flex-shrink: 0; display: flex; align-items: center; gap: 14px; }
  .profile-body { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }
  .profile-card { background: rgba(255,255,255,0.04); border-radius: 20px; padding: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
  .profile-avatar-big { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; }
  .profile-name { font-size: 22px; font-weight: 900; color: #fff; }
  .profile-email { font-size: 13px; color: #555; font-weight: 600; margin-top: 4px; }
  .setting-row {
    display: flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.04); border-radius: 14px; padding: 14px 16px;
    border: none; cursor: pointer; width: 100%; font-family: 'Nunito', sans-serif;
    color: #fff; font-size: 14px; font-weight: 700; transition: background 0.15s;
  }
  .setting-row:hover { background: rgba(255,255,255,0.07); }
  .setting-icon { font-size: 20px; width: 28px; text-align: center; }

  /* EMPTY STATE */
  .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px; }
  .empty-icon { font-size: 48px; opacity: 0.3; }
  .empty-text { font-size: 15px; font-weight: 700; color: #444; text-align: center; }
  .empty-sub { font-size: 12px; color: #333; font-weight: 600; text-align: center; }

  /* TOAST */
  #toast {
    position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: rgba(78,205,196,0.9); color: #0E0E1A; padding: 10px 20px;
    border-radius: 20px; font-size: 13px; font-weight: 800;
    opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 999; white-space: nowrap;
  }
  #toast.show { opacity: 1; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* CALL OVERLAY */
  #call-overlay {
    position: absolute; inset: 0; z-index: 200;
    background: linear-gradient(160deg, #0E0E2A, #141428);
    display: none; flex-direction: column; align-items: center;
    justify-content: space-between; padding: 60px 30px 50px;
  }
  #call-overlay.active { display: flex; }
  .call-avatar { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 900; color: #fff; animation: callPulse 2s infinite; }
  @keyframes callPulse { 0%,100%{box-shadow:0 0 0 0 rgba(78,205,196,0.4);} 70%{box-shadow:0 0 0 22px rgba(78,205,196,0);} }
  .end-btn { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, #FF4757, #FF6B81); border: none; cursor: pointer; font-size: 26px; box-shadow: 0 8px 25px rgba(255,71,87,0.5); }
</style>
</head>
<body>
<div id="app">

  <!-- AUTH SCREEN -->
  <div id="auth-screen" class="screen active">
    <div class="logo-big">poko<span>poko</span></div>
    <div class="tagline">CONNECT · TALK · SHARE</div>
    <div class="auth-card">
      <div class="auth-title" id="auth-title">Welcome back 👋</div>
      <div class="auth-sub" id="auth-sub">Sign in to continue</div>
      <div class="input-group" id="name-group" style="display:none">
        <label class="input-label">DISPLAY NAME</label>
        <input class="poko-input" id="name-input" placeholder="Your name" />
      </div>
      <div class="input-group">
        <label class="input-label">EMAIL</label>
        <input class="poko-input" id="email-input" type="email" placeholder="you@email.com" />
      </div>
      <div class="input-group">
        <label class="input-label">PASSWORD</label>
        <input class="poko-input" id="pass-input" type="password" placeholder="••••••••" />
      </div>
      <button class="poko-btn" id="auth-btn">Sign In</button>
      <div class="error-msg" id="auth-error"></div>
      <div class="auth-footer" id="auth-toggle">Don't have an account? <span>Sign up</span></div>
    </div>
  </div>

  <!-- MAIN SCREEN -->
  <div id="main-screen" class="screen">
    <div class="main-header">
      <div class="header-top">
        <div class="logo-sm">poko<span>poko</span></div>
        <div class="header-actions">
          <button class="icon-btn teal" id="add-friend-btn" title="Add Friend">➕</button>
          <button class="icon-btn" id="signout-btn" title="Sign Out">🚪</button>
        </div>
      </div>
      <div class="search-bar">
        <span style="opacity:0.4;font-size:15px">🔍</span>
        <input id="search-input" placeholder="Search chats..." />
      </div>
    </div>
    <div class="tabs">
      <button class="tab active" data-tab="chats">💬 Chats</button>
      <button class="tab" data-tab="calls">📞 Calls</button>
      <button class="tab" data-tab="profile">👤 Profile</button>
    </div>
    <div id="tab-chats" class="contacts-list"></div>
    <div id="tab-calls" style="display:none;flex:1;overflow-y:auto;padding:20px"></div>
    <div id="tab-profile" style="display:none;flex:1;overflow-y:auto"></div>
    <div class="bottom-nav">
      <button class="nav-btn active" data-nav="chats"><span class="nav-icon">💬</span><span class="nav-label">Chats</span></button>
      <button class="nav-btn" data-nav="calls"><span class="nav-icon">📞</span><span class="nav-label">Calls</span></button>
      <button class="nav-btn" data-nav="profile"><span class="nav-icon">👤</span><span class="nav-label">Profile</span></button>
    </div>
  </div>

  <!-- ADD FRIEND SCREEN -->
  <div id="add-screen" class="screen">
    <div class="add-header">
      <button class="back-btn" id="add-back">←</button>
      <h2>Add Friend</h2>
    </div>
    <div class="add-body">
      <div class="input-group">
        <label class="input-label">SEARCH BY EMAIL</label>
        <input class="poko-input" id="friend-search-input" type="email" placeholder="friend@email.com" />
      </div>
      <button class="poko-btn" id="friend-search-btn">Search</button>
      <div id="friend-result"></div>
    </div>
  </div>

  <!-- CHAT SCREEN -->
  <div id="chat-screen" class="screen">
    <div class="chat-header">
      <button class="back-btn" id="chat-back">←</button>
      <div id="chat-avatar" class="avatar" style="width:40px;height:40px;font-size:14px"></div>
      <div class="chat-header-info" id="chat-header-info">
        <div class="chat-header-name" id="chat-name"></div>
        <div class="chat-header-status" id="chat-status"></div>
      </div>
      <div class="chat-actions">
        <button class="icon-btn teal" id="voice-call-btn">📞</button>
        <button class="icon-btn teal" id="video-call-btn">📹</button>
      </div>
    </div>
    <div class="messages-area" id="messages-area"></div>
    <div class="emoji-row" id="emoji-row" style="display:none">
      <button class="emoji-pick" data-e="😀">😀</button>
      <button class="emoji-pick" data-e="😂">😂</button>
      <button class="emoji-pick" data-e="❤️">❤️</button>
      <button class="emoji-pick" data-e="🔥">🔥</button>
      <button class="emoji-pick" data-e="👍">👍</button>
      <button class="emoji-pick" data-e="🎉">🎉</button>
      <button class="emoji-pick" data-e="😍">😍</button>
      <button class="emoji-pick" data-e="🙏">🙏</button>
      <button class="emoji-pick" data-e="😭">😭</button>
      <button class="emoji-pick" data-e="🤔">🤔</button>
      <button class="emoji-pick" data-e="😎">😎</button>
      <button class="emoji-pick" data-e="🥰">🥰</button>
      <button class="emoji-pick" data-e="💯">💯</button>
      <button class="emoji-pick" data-e="✨">✨</button>
      <button class="emoji-pick" data-e="🎤">🎤</button>
    </div>
    <div class="input-bar">
      <button class="icon-btn" id="emoji-toggle-btn" style="font-size:20px">😊</button>
      <input class="msg-input" id="msg-input" placeholder="Message..." />
      <button class="send-btn" id="send-btn">➤</button>
    </div>
  </div>

  <!-- CALL OVERLAY -->
  <div id="call-overlay">
    <div style="text-align:center">
      <div style="font-size:12px;color:#4ECDC4;font-weight:800;letter-spacing:2px;margin-bottom:20px" id="call-type-label">VOICE CALL</div>
      <div class="call-avatar" id="call-avatar"></div>
      <div style="font-size:24px;font-weight:900;color:#fff" id="call-name"></div>
      <div style="font-size:13px;color:#666;margin-top:6px;font-weight:600" id="call-timer">00:00</div>
    </div>
    <div style="display<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>pokopoko</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A0A14; font-family: 'Nunito', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 4px; }

  #app {
    width: 100%;
    max-width: 420px;
    height: 100vh;
    max-height: 820px;
    background: #13131F;
    border-radius: 36px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
    position: relative;
  }

  /* SCREENS */
  .screen { display: none; flex-direction: column; height: 100%; }
  .screen.active { display: flex; }

  /* AUTH SCREEN */
  #auth-screen {
    background: linear-gradient(160deg, #0E0E2A 0%, #13131F 100%);
    align-items: center; justify-content: center; gap: 0; padding: 40px 30px;
  }
  .logo-big { font-size: 42px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .logo-big span { color: #4ECDC4; }
  .tagline { font-size: 13px; color: #555; font-weight: 700; margin-bottom: 48px; letter-spacing: 1px; }
  .auth-card { width: 100%; background: rgba(255,255,255,0.04); border-radius: 24px; padding: 28px; border: 1px solid rgba(255,255,255,0.06); }
  .auth-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .auth-sub { font-size: 13px; color: #555; font-weight: 600; margin-bottom: 24px; }
  .input-group { margin-bottom: 14px; }
  .input-label { font-size: 11px; color: #4ECDC4; font-weight: 800; letter-spacing: 1px; margin-bottom: 6px; display: block; }
  .poko-input {
    width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 13px 16px; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Nunito', sans-serif; outline: none; transition: border 0.2s;
  }
  .poko-input:focus { border-color: #4ECDC4; }
  .poko-input::placeholder { color: #333; }
  .poko-btn {
    width: 100%; padding: 14px; border: none; border-radius: 14px; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 900;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; box-shadow: 0 6px 20px rgba(78,205,196,0.35);
    transition: all 0.15s; margin-top: 6px;
  }
  .poko-btn:hover { transform: scale(1.02); filter: brightness(1.05); }
  .poko-btn:active { transform: scale(0.98); }
  .poko-btn.secondary { background: rgba(255,255,255,0.06); color: #fff; box-shadow: none; margin-top: 10px; }
  .error-msg { font-size: 12px; color: #FF6B6B; font-weight: 700; margin-top: 10px; text-align: center; min-height: 18px; }
  .auth-footer { font-size: 13px; color: #444; font-weight: 600; margin-top: 18px; text-align: center; cursor: pointer; }
  .auth-footer span { color: #4ECDC4; }

  /* LOADING */
  .spinner {
    width: 36px; height: 36px; border: 3px solid rgba(78,205,196,0.2);
    border-top-color: #4ECDC4; border-radius: 50%;
    animation: spin 0.8s linear infinite; margin: 0 auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* MAIN SCREEN */
  #main-screen { background: #13131F; }
  .main-header {
    padding: 48px 20px 14px;
    background: linear-gradient(180deg, #1A1A2E 0%, #13131F 100%);
    flex-shrink: 0;
  }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .logo-sm { font-size: 24px; font-weight: 900; color: #fff; }
  .logo-sm span { color: #4ECDC4; }
  .header-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 11px; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: 17px;
    transition: all 0.15s; background: rgba(255,255,255,0.06); color: #fff;
  }
  .icon-btn.teal { background: rgba(78,205,196,0.15); color: #4ECDC4; }
  .search-bar {
    display: flex; align-items: center; gap: 10;
    background: rgba(255,255,255,0.06); border-radius: 13px; padding: 10px 14px;
  }
  .search-bar input {
    background: none; border: none; outline: none; color: #fff;
    font-size: 14px; font-weight: 600; flex: 1; font-family: 'Nunito', sans-serif;
  }
  .search-bar input::placeholder { color: #333; }

  /* TABS */
  .tabs {
    display: flex; border-bottom: 1px solid rgba(255,255,255,0.05);
    background: #13131F; flex-shrink: 0;
  }
  .tab {
    flex: 1; padding: 11px 0; background: none; border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s;
    color: #444; border-bottom: 2px solid transparent;
  }
  .tab.active { color: #4ECDC4; border-bottom-color: #4ECDC4; }

  /* CONTACT LIST */
  .contacts-list { flex: 1; overflow-y: auto; }
  .contact-row {
    display: flex; align-items: center; gap: 13px;
    padding: 13px 18px; cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    transition: background 0.15s; animation: fadeUp 0.3s ease both;
  }
  .contact-row:hover { background: rgba(255,255,255,0.04); }
  .avatar {
    width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 900; color: #fff; position: relative;
  }
  .online-dot {
    position: absolute; bottom: 1px; right: 1px;
    width: 11px; height: 11px; border-radius: 50%;
    background: #4ECDC4; border: 2px solid #13131F;
  }
  .contact-info { flex: 1; min-width: 0; }
  .contact-name { font-size: 15px; font-weight: 800; color: #fff; }
  .contact-last { font-size: 12px; color: #555; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 3px; }
  .contact-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
  .contact-time { font-size: 11px; color: #444; font-weight: 700; }
  .unread-badge {
    min-width: 20px; height: 20px; border-radius: 10px;
    background: #4ECDC4; color: #0E0E1A;
    font-size: 10px; font-weight: 900;
    display: flex; align-items: center; justify-content: center; padding: 0 5px;
  }

  /* BOTTOM NAV */
  .bottom-nav {
    display: flex; justify-content: space-around;
    padding: 10px 0 22px;
    background: #1A1A2E; border-top: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .nav-btn {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    background: none; border: none; cursor: pointer;
    color: #444; transition: all 0.2s; font-family: 'Nunito', sans-serif;
    padding: 4px 16px;
  }
  .nav-btn.active { color: #4ECDC4; }
  .nav-btn .nav-icon { font-size: 22px; }
  .nav-btn .nav-label { font-size: 10px; font-weight: 800; }

  /* CHAT SCREEN */
  #chat-screen { background: #0E0E1A; }
  .chat-header {
    display: flex; align-items: center; gap: 11px;
    padding: 48px 14px 13px;
    background: #1A1A2E; flex-shrink: 0;
  }
  .back-btn { background: none; border: none; color: #4ECDC4; font-size: 22px; cursor: pointer; padding: 2px 8px 2px 0; }
  .chat-header-info { flex: 1; cursor: pointer; }
  .chat-header-name { font-size: 16px; font-weight: 800; color: #fff; }
  .chat-header-status { font-size: 12px; font-weight: 600; margin-top: 1px; }
  .chat-actions { display: flex; gap: 8px; }

  /* MESSAGES */
  .messages-area { flex: 1; overflow-y: auto; padding: 14px 13px; display: flex; flex-direction: column; gap: 7px; }
  .msg-wrap { display: flex; animation: fadeUp 0.2s ease; }
  .msg-wrap.me { justify-content: flex-end; }
  .msg-wrap.them { justify-content: flex-start; }
  .bubble {
    max-width: 72%; border-radius: 18px; padding: 10px 14px;
    font-size: 14px; font-weight: 600; line-height: 1.4;
  }
  .bubble.me {
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; border-bottom-right-radius: 4px;
    box-shadow: 0 4px 14px rgba(78,205,196,0.25);
  }
  .bubble.them {
    background: rgba(255,255,255,0.07); color: #ddd; border-bottom-left-radius: 4px;
  }
  .bubble-time { font-size: 10px; opacity: 0.55; margin-top: 4px; text-align: right; font-weight: 700; }
  .typing-bubble { display: flex; gap: 5px; align-items: center; padding: 12px 16px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #4ECDC4; }
  .dot:nth-child(1) { animation: blink 1.4s 0s infinite; }
  .dot:nth-child(2) { animation: blink 1.4s 0.2s infinite; }
  .dot:nth-child(3) { animation: blink 1.4s 0.4s infinite; }
  @keyframes blink { 0%,80%,100%{opacity:0.2;} 40%{opacity:1;} }

  /* INPUT BAR */
  .input-bar {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 13px 24px;
    background: #1A1A2E; border-top: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .msg-input {
    flex: 1; background: rgba(255,255,255,0.06); border: none; border-radius: 14px;
    padding: 11px 15px; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Nunito', sans-serif; outline: none;
  }
  .msg-input::placeholder { color: #333; }
  .send-btn {
    width: 42px; height: 42px; border-radius: 13px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(78,205,196,0.35); transition: all 0.15s;
  }
  .send-btn:hover { transform: scale(1.05); }

  /* EMOJI */
  .emoji-row {
    background: #1A1A2E; padding: 10px 14px;
    display: flex; flex-wrap: wrap; gap: 8px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .emoji-pick { background: none; border: none; font-size: 22px; cursor: pointer; transition: transform 0.1s; }
  .emoji-pick:hover { transform: scale(1.3); }

  /* ADD FRIEND SCREEN */
  #add-screen { background: #13131F; }
  .add-header { padding: 48px 20px 20px; background: #1A1A2E; flex-shrink: 0; display: flex; align-items: center; gap: 14px; }
  .add-header h2 { font-size: 20px; font-weight: 900; color: #fff; }
  .add-body { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 14px; }
  .add-result {
    display: flex; align-items: center; gap: 13px;
    background: rgba(255,255,255,0.04); border-radius: 16px; padding: 14px 16px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .add-result-info { flex: 1; }
  .add-result-name { font-size: 15px; font-weight: 800; color: #fff; }
  .add-result-email { font-size: 12px; color: #555; font-weight: 600; margin-top: 2px; }
  .add-btn {
    padding: 9px 18px; border-radius: 11px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #4ECDC4, #44b5ad);
    color: #0E0E1A; font-size: 13px; font-weight: 900; font-family: 'Nunito', sans-serif;
  }

  /* PROFILE SCREEN */
  #profile-screen { background: #13131F; }
  .profile-header { padding: 48px 20px 20px; background: #1A1A2E; flex-shrink: 0; display: flex; align-items: center; gap: 14px; }
  .profile-body { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }
  .profile-card { background: rgba(255,255,255,0.04); border-radius: 20px; padding: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
  .profile-avatar-big { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; color: #fff; }
  .profile-name { font-size: 22px; font-weight: 900; color: #fff; }
  .profile-email { font-size: 13px; color: #555; font-weight: 600; margin-top: 4px; }
  .setting-row {
    display: flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.04); border-radius: 14px; padding: 14px 16px;
    border: none; cursor: pointer; width: 100%; font-family: 'Nunito', sans-serif;
    color: #fff; font-size: 14px; font-weight: 700; transition: background 0.15s;
  }
  .setting-row:hover { background: rgba(255,255,255,0.07); }
  .setting-icon { font-size: 20px; width: 28px; text-align: center; }

  /* EMPTY STATE */
  .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px; }
  .empty-icon { font-size: 48px; opacity: 0.3; }
  .empty-text { font-size: 15px; font-weight: 700; color: #444; text-align: center; }
  .empty-sub { font-size: 12px; color: #333; font-weight: 600; text-align: center; }

  /* TOAST */
  #toast {
    position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: rgba(78,205,196,0.9); color: #0E0E1A; padding: 10px 20px;
    border-radius: 20px; font-size: 13px; font-weight: 800;
    opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 999; white-space: nowrap;
  }
  #toast.show { opacity: 1; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* CALL OVERLAY */
  #call-overlay {
    position: absolute; inset: 0; z-index: 200;
    background: linear-gradient(160deg, #0E0E2A, #141428);
    display: none; flex-direction: column; align-items: center;
    justify-content: space-between; padding: 60px 30px 50px;
  }
  #call-overlay.active { display: flex; }
  .call-avatar { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 900; color: #fff; animation: callPulse 2s infinite; }
  @keyframes callPulse { 0%,100%{box-shadow:0 0 0 0 rgba(78,205,196,0.4);} 70%{box-shadow:0 0 0 22px rgba(78,205,196,0);} }
  .end-btn { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, #FF4757, #FF6B81); border: none; cursor: pointer; font-size: 26px; box-shadow: 0 8px 25px rgba(255,71,87,0.5); }
</style>
</head>
<body>
<div id="app">

  <!-- AUTH SCREEN -->
  <div id="auth-screen" class="screen active">
    <div class="logo-big">poko<span>poko</span></div>
    <div class="tagline">CONNECT · TALK · SHARE</div>
    <div class="auth-card">
      <div class="auth-title" id="auth-title">Welcome back 👋</div>
      <div class="auth-sub" id="auth-sub">Sign in to continue</div>
      <div class="input-group" id="name-group" style="display:none">
        <label class="input-label">DISPLAY NAME</label>
        <input class="poko-input" id="name-input" placeholder="Your name" />
      </div>
      <div class="input-group">
        <label class="input-label">EMAIL</label>
        <input class="poko-input" id="email-input" type="email" placeholder="you@email.com" />
      </div>
      <div class="input-group">
        <label class="input-label">PASSWORD</label>
        <input class="poko-input" id="pass-input" type="password" placeholder="••••••••" />
      </div>
      <button class="poko-btn" id="auth-btn">Sign In</button>
      <div class="error-msg" id="auth-error"></div>
      <div class="auth-footer" id="auth-toggle">Don't have an account? <span>Sign up</span></div>
    </div>
  </div>

  <!-- MAIN SCREEN -->
  <div id="main-screen" class="screen">
    <div class="main-header">
      <div class="header-top">
        <div class="logo-sm">poko<span>poko</span></div>
        <div class="header-actions">
          <button class="icon-btn teal" id="add-friend-btn" title="Add Friend">➕</button>
          <button class="icon-btn" id="signout-btn" title="Sign Out">🚪</button>
        </div>
      </div>
      <div class="search-bar">
        <span style="opacity:0.4;font-size:15px">🔍</span>
        <input id="search-input" placeholder="Search chats..." />
      </div>
    </div>
    <div class="tabs">
      <button class="tab active" data-tab="chats">💬 Chats</button>
      <button class="tab" data-tab="calls">📞 Calls</button>
      <button class="tab" data-tab="profile">👤 Profile</button>
    </div>
    <div id="tab-chats" class="contacts-list"></div>
    <div id="tab-calls" style="display:none;flex:1;overflow-y:auto;padding:20px"></div>
    <div id="tab-profile" style="display:none;flex:1;overflow-y:auto"></div>
    <div class="bottom-nav">
      <button class="nav-btn active" data-nav="chats"><span class="nav-icon">💬</span><span class="nav-label">Chats</span></button>
      <button class="nav-btn" data-nav="calls"><span class="nav-icon">📞</span><span class="nav-label">Calls</span></button>
      <button class="nav-btn" data-nav="profile"><span class="nav-icon">👤</span><span class="nav-label">Profile</span></button>
    </div>
  </div>

  <!-- ADD FRIEND SCREEN -->
  <div id="add-screen" class="screen">
    <div class="add-header">
      <button class="back-btn" id="add-back">←</button>
      <h2>Add Friend</h2>
    </div>
    <div class="add-body">
      <div class="input-group">
        <label class="input-label">SEARCH BY EMAIL</label>
        <input class="poko-input" id="friend-search-input" type="email" placeholder="friend@email.com" />
      </div>
      <button class="poko-btn" id="friend-search-btn">Search</button>
      <div id="friend-result"></div>
    </div>
  </div>

  <!-- CHAT SCREEN -->
  <div id="chat-screen" class="screen">
    <div class="chat-header">
      <button class="back-btn" id="chat-back">←</button>
      <div id="chat-avatar" class="avatar" style="width:40px;height:40px;font-size:14px"></div>
      <div class="chat-header-info" id="chat-header-info">
        <div class="chat-header-name" id="chat-name"></div>
        <div class="chat-header-status" id="chat-status"></div>
      </div>
      <div class="chat-actions">
        <button class="icon-btn teal" id="voice-call-btn">📞</button>
        <button class="icon-btn teal" id="video-call-btn">📹</button>
      </div>
    </div>
    <div class="messages-area" id="messages-area"></div>
    <div class="emoji-row" id="emoji-row" style="display:none">
      <button class="emoji-pick" data-e="😀">😀</button>
      <button class="emoji-pick" data-e="😂">😂</button>
      <button class="emoji-pick" data-e="❤️">❤️</button>
      <button class="emoji-pick" data-e="🔥">🔥</button>
      <button class="emoji-pick" data-e="👍">👍</button>
      <button class="emoji-pick" data-e="🎉">🎉</button>
      <button class="emoji-pick" data-e="😍">😍</button>
      <button class="emoji-pick" data-e="🙏">🙏</button>
      <button class="emoji-pick" data-e="😭">😭</button>
      <button class="emoji-pick" data-e="🤔">🤔</button>
      <button class="emoji-pick" data-e="😎">😎</button>
      <button class="emoji-pick" data-e="🥰">🥰</button>
      <button class="emoji-pick" data-e="💯">💯</button>
      <button class="emoji-pick" data-e="✨">✨</button>
      <button class="emoji-pick" data-e="🎤">🎤</button>
    </div>
    <div class="input-bar">
      <button class="icon-btn" id="emoji-toggle-btn" style="font-size:20px">😊</button>
      <input class="msg-input" id="msg-input" placeholder="Message..." />
      <button class="send-btn" id="send-btn">➤</button>
    </div>
  </div>

  <!-- CALL OVERLAY -->
  <div id="call-overlay">
    <div style="text-align:center">
      <div style="font-size:12px;color:#4ECDC4;font-weight:800;letter-spacing:2px;margin-bottom:20px" id="call-type-label">VOICE CALL</div>
      <div class="call-avatar" id="call-avatar"></div>
      <div style="font-size:24px;font-weight:900;color:#fff" id="call-name"></div>
      <div style="font-size:13px;color:#666;margin-top:6px;font-weight:600" id="call-timer">00:00</div>
    </div>
    <div style="display:flex;gap:28px;align-items:center">
      <div style="text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;margin:0 auto 5px">🔇</div>
        <div style="font-size:10px;color:#555;font-weight:700">Mute</div>
      </div>
      <div style="text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;margin:0 auto 5px">📢</div>
        <div style="font-size:10px;color:#555;font-weight:700">Speaker</div>
      </div>
    </div>
    <button class="end-btn" id="end-call-btn">📵</button>
  </div>

  <div id="toast"></div>
</div>

<!-- Firebase -->
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, doc, setDoc, getDoc, getDocs,
  addDoc, onSnapshot, query, orderBy, serverTimestamp,
  where, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Firebase config ───────────────────────────────────────────
const app = initializeApp({
  apiKey: "AIzaSyAT5kRjuZnZok8FOul7RDgQOz46JKNlQsk",
  authDomain: "pokopoko-b9298.firebaseapp.com",
  projectId: "pokopoko-b9298",
  storageBucket: "pokopoko-b9298.firebasestorage.app",
  messagingSenderId: "606884614740",
  appId: "1:606884614740:web:pokopoko"
});
const auth = getAuth(app);
const db = getFirestore(app);

// ── State ─────────────────────────────────────────────────────
let currentUser = null;
let currentChatId = null;
let currentContact = null;
let msgUnsub = null;
let contactsUnsub = null;
let callInterval = null;
let callSeconds = 0;
let isSignUp = false;
const COLORS = ["#FF6B6B","#4ECDC4","#FFE66D","#A8E6CF","#FF8B94","#B8B8FF","#FFA07A","#98D8C8"];

// ── Helpers ───────────────────────────────────────────────────
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
function avatarColor(uid) { return COLORS[uid.charCodeAt(0) % COLORS.length]; }
function initials(name) { return name ? name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : '??' }
function chatId(a, b) { return [a,b].sort().join('_'); }
function timeStr(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
function scrollBottom() {
  const a = document.getElementById('messages-area');
  setTimeout(() => a.scrollTop = a.scrollHeight, 50);
}

// ── Auth ──────────────────────────────────────────────────────
onAuthStateChanged(auth, async user => {
  if (user) {
    currentUser = user;
    await ensureUserDoc(user);
    show('main-screen');
    loadContacts();
  } else {
    currentUser = null;
    show('auth-screen');
  }
});

async function ensureUserDoc(user) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      color: avatarColor(user.uid),
      contacts: [],
      createdAt: serverTimestamp()
    });
  }
}

document.getElementById('auth-btn').onclick = async () => {
  const email = document.getElementById('email-input').value.trim();
  const pass = document.getElementById('pass-input').value;
  const name = document.getElementById('name-input').value.trim();
  const errEl = document.getElementById('auth-error');
  errEl.textContent = '';
  if (!email || !pass) { errEl.textContent = 'Please fill all fields.'; return; }
  try {
    if (isSignUp) {
      if (!name) { errEl.textContent = 'Please enter your name.'; return; }
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
    } else {
      await signInWithEmailAndPassword(auth, email, pass);
    }
  } catch(e) {
    errEl.textContent = e.message.replace('Firebase: ','').replace(/\(.*\)/,'');
  }
};

document.getElementById('auth-toggle').onclick = () => {
  isSignUp = !isSignUp;
  document.getElementById('auth-title').textContent = isSignUp ? 'Create account 🚀' : 'Welcome back 👋';
  document.getElementById('auth-sub').textContent = isSignUp ? 'Join pokopoko today' : 'Sign in to continue';
  document.getElementById('auth-btn').textContent = isSignUp ? 'Create Account' : 'Sign In';
  document.getElementById('name-group').style.display = isSignUp ? 'block' : 'none';
  document.getElementById('auth-toggle').innerHTML = isSignUp
    ? 'Already have an account? <span>Sign in</span>'
    : "Don't have an account? <span>Sign up</span>";
  document.getElementById('auth-error').textContent = '';
};

document.getElementById('signout-btn').onclick = () => signOut(auth);

// ── Contacts / Chats ──────────────────────────────────────────
async function loadContacts() {
  if (contactsUnsub) contactsUnsub();
  const userRef = doc(db, 'users', currentUser.uid);
  contactsUnsub = onSnapshot(userRef, async snap => {
    const data = snap.data();
    const contacts = data?.contacts || [];
    await renderChatList(contacts);
  });
  renderProfileTab();
}

async function renderChatList(contactUids) {
  const list = document.getElementById('tab-chats');
  list.innerHTML = '';
  if (!contactUids.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">💬</div><div class="empty-text">No chats yet</div><div class="empty-sub">Add friends with the ➕ button</div></div>`;
    return;
  }
  for (const uid of contactUids) {
    const usnap = await getDoc(doc(db, 'users', uid));
    if (!usnap.exists()) continue;
    const contact = usnap.data();
    const cid = chatId(currentUser.uid, uid);
    // get last message
    let lastMsg = '', lastTime = '';
    try {
      const mq = query(collection(db, 'chats', cid, 'messages'), orderBy('createdAt','desc'));
      const msnap = await getDocs(mq);
      if (!msnap.empty) {
        const last = msnap.docs[0].data();
        lastMsg = last.text || '';
        lastTime = timeStr(last.createdAt);
      }
    } catch(e) {}

    const row = document.createElement('div');
    row.className = 'contact-row';
    row.innerHTML = `
      <div class="avatar" style="background:linear-gradient(135deg,${contact.color},${contact.color}88)">
        ${initials(contact.name)}
      </div>
      <div class="contact-info">
        <div class="contact-name">${contact.name}</div>
        <div class="contact-last">${lastMsg || 'Say hello! 👋'}</div>
      </div>
      <div class="contact-meta">
        <div class="contact-time">${lastTime}</div>
      </div>
    `;
    row.onclick = () => openChat(uid, contact);
    list.appendChild(row);
  }
}

function renderCallsTab() {
  const el = document.getElementById('tab-calls');
  el.innerHTML = `<div style="color:#555;font-size:13px;font-weight:700;margin-bottom:14px;letter-spacing:1px">RECENT CALLS</div>
  <div class="empty-state" style="padding:60px 0"><div class="empty-icon">📞</div><div class="empty-text">No recent calls</div><div class="empty-sub">Start a call from any chat</div></div>`;
}

async function renderProfileTab() {
  const el = document.getElementById('tab-profile');
  const snap = await getDoc(doc(db, 'users', currentUser.uid));
  const u = snap.data() || {};
  const color = u.color || '#4ECDC4';
  el.innerHTML = `
    <div class="profile-body">
      <div class="profile-card">
        <div class="profile-avatar-big" style="background:linear-gradient(135deg,${color},${color}88)">${initials(u.name)}</div>
        <div class="profile-name">${u.name || 'User'}</div>
        <div class="profile-email">${u.email || ''}</div>
      </div>
      <button class="setting-row" onclick="document.getElementById('signout-btn').click()">
        <span class="setting-icon">🚪</span> Sign Out
      </button>
      <div style="font-size:11px;color:#333;text-align:center;font-weight:700;margin-top:10px">pokopoko v1.0 · Made with ❤️</div>
    </div>
  `;
}

// ── Add Friend ────────────────────────────────────────────────
document.getElementById('add-friend-btn').onclick = () => { show('add-screen'); document.getElementById('friend-result').innerHTML=''; document.getElementById('friend-search-input').value=''; };
document.getElementById('add-back').onclick = () => show('main-screen');

document.getElementById('friend-search-btn').onclick = async () => {
  const email = document.getElementById('friend-search-input').value.trim();
  const res = document.getElementById('friend-result');
  res.innerHTML = '<div style="color:#555;font-size:13px;font-weight:700;text-align:center;padding:14px">Searching...</div>';
  if (!email) { res.innerHTML = ''; return; }
  const q = query(collection(db, 'users'), where('email','==',email));
  const snap = await getDocs(q);
  if (snap.empty) { res.innerHTML = '<div style="color:#FF6B6B;font-size:13px;font-weight:700;text-align:center;padding:14px">User not found</div>'; return; }
  const found = snap.docs[0].data();
  if (found.uid === currentUser.uid) { res.innerHTML = '<div style="color:#FF6B6B;font-size:13px;font-weight:700;text-align:center;padding:14px">That\'s you! 😄</div>'; return; }
  res.innerHTML = `
    <div class="add-result">
      <div class="avatar" style="background:linear-gradient(135deg,${found.color},${found.color}88);width:46px;height:46px;font-size:15px">${initials(found.name)}</div>
      <div class="add-result-info">
        <div class="add-result-name">${found.name}</div>
        <div class="add-result-email">${found.email}</div>
      </div>
      <button class="add-btn" id="do-add-btn">Add</button>
    </div>`;
  document.getElementById('do-add-btn').onclick = async () => {
    await updateDoc(doc(db, 'users', currentUser.uid), { contacts: arrayUnion(found.uid) });
    await updateDoc(doc(db, 'users', found.uid), { contacts: arrayUnion(currentUser.uid) });
    toast(`${found.name} added! 🎉`);
    show('main-screen');
    loadContacts();
  };
};

// ── Chat ──────────────────────────────────────────────────────
async function openChat(uid, contact) {
  currentContact = contact;
  currentChatId = chatId(currentUser.uid, uid);
  document.getElementById('chat-name').textContent = contact.name;
  document.getElementById('chat-status').textContent = '● online';
  document.getElementById('chat-status').style.color = '#4ECDC4';
  const av = document.getElementById('chat-avatar');
  av.textContent = initials(contact.name);
  av.style.background = `linear-gradient(135deg,${contact.color},${contact.color}88)`;
  document.getElementById('messages-area').innerHTML = '';
  show('chat-screen');
  if (msgUnsub) msgUnsub();
  // Ensure chat doc exists
  await setDoc(doc(db, 'chats', currentChatId), { members: [currentUser.uid, uid] }, { merge: true });
  const mq = query(collection(db, 'chats', currentChatId, 'messages'), orderBy('createdAt','asc'));
  msgUnsub = onSnapshot(mq, snap => {
    const area = document.getElementById('messages-area');
    area.innerHTML = '';
    snap.forEach(d => renderMessage(d.data()));
    scrollBottom();
  });
}

function renderMessage(data) {
  const area = document.getElementById('messages-area');
  const isMe = data.senderId === currentUser.uid;
  const wrap = document.createElement('div');
  wrap.className = `msg-wrap ${isMe ? 'me' : 'them'}`;
  wrap.innerHTML = `
    <div class="bubble ${isMe ? 'me' : 'them'}">
      ${escHtml(data.text)}
      <div class="bubble-time">${timeStr(data.createdAt)}</div>
    </div>`;
  area.appendChild(wrap);
}

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

document.getElementById('chat-back').onclick = () => {
  if (msgUnsub) { msgUnsub(); msgUnsub = null; }
  show('main-screen');
  loadContacts();
};

async function sendMessage() {
  const input = document.getElementById('msg-input');
  const text = input.value.trim();
  if (!text || !currentChatId) return;
  input.value = '';
  document.getElementById('emoji-row').style.display = 'none';
  await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
    text,
    senderId: currentUser.uid,
    senderName: currentUser.displayName || currentUser.email,
    createdAt: serverTimestamp()
  });
  scrollBottom();
}

document.getElementById('send-btn').onclick = sendMessage;
document.getElementById('msg-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

// ── Emoji ─────────────────────────────────────────────────────
document.getElementById('emoji-toggle-btn').onclick = () => {
  const er = document.getElementById('emoji-row');
  er.style.display = er.style.display === 'none' ? 'flex' : 'none';
};
document.querySelectorAll('.emoji-pick').forEach(btn => {
  btn.onclick = () => { document.getElementById('msg-input').value += btn.dataset.e; };
});

// ── Tabs ──────────────────────────────────────────────────────
document.querySelectorAll('.tab, .nav-btn').forEach(btn => {
  btn.onclick = () => {
    const t = btn.dataset.tab || btn.dataset.nav;
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === t));
    document.getElementById('tab-chats').style.display = t === 'chats' ? 'block' : 'none';
    document.getElementById('tab-calls').style.display = t === 'calls' ? 'block' : 'none';
    document.getElementById('tab-profile').style.display = t === 'profile' ? 'block' : 'none';
    if (t === 'calls') renderCallsTab();
    if (t === 'profile') renderProfileTab();
  };
});

// ── Search ────────────────────────────────────────────────────
document.getElementById('search-input').oninput = async (e) => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.contact-row').forEach(row => {
    const name = row.querySelector('.contact-name')?.textContent.toLowerCase() || '';
    row.style.display = name.includes(q) ? '' : 'none';
  });
};

// ── Calls ─────────────────────────────────────────────────────
function startCall(type) {
  if (!currentContact) return;
  const overlay = document.getElementById('call-overlay');
  document.getElementById('call-type-label').textContent = type === 'video' ? 'VIDEO CALL' : 'VOICE CALL';
  document.getElementById('call-name').textContent = currentContact.name;
  const av = document.getElementById('call-avatar');
  av.textContent = initials(currentContact.name);
  av.style.background = `linear-gradient(135deg,${currentContact.color},${currentContact.color}88)`;
  overlay.classList.add('active');
  callSeconds = 0;
  document.getElementById('call-timer').textContent = '00:00';
  callInterval = setInterval(() => {
    callSeconds++;
    const m = String(Math.floor(callSeconds/60)).padStart(2,'0');
    const s = String(callSeconds%60).padStart(2,'0');
    document.getElementById('call-timer').textContent = `${m}:${s}`;
  }, 1000);
}
document.getElementById('voice-call-btn').onclick = () => startCall('voice');
document.getElementById('video-call-btn').onclick = () => startCall('video');
document.getElementById('end-call-btn').onclick = () => {
  document.getElementById('call-overlay').classList.remove('active');
  clearInterval(callInterval);
};
</script>
</body>
</html>
