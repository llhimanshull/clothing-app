const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const additionalCss = `
/* UI SCREENS FIX */
.phone-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}

.phone-s5, .phone-s6, .phone-s7 {
  gap: 12px;
}

.phone-s5__item, .phone-s6__item {
  background: var(--gray-light);
  border-radius: 12px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.phone-s7__chat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.phone-s7__bubble {
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  max-width: 90%;
}
.phone-s7__bubble--sent {
  background: var(--teal);
  color: var(--white);
  border-bottom-right-radius: 4px;
  align-self: flex-end;
}
.phone-s7__bubble--received {
  background: var(--gray-light);
  color: var(--dark);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
}
`;

css += additionalCss;
fs.writeFileSync('src/app/globals.css', css);
