import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://ctbinjrluknryxgsmimp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0YmluanJsdWtucnl4Z3NtaW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMzc3MDAsImV4cCI6MjA4MTYxMzcwMH0.QCvI8cq0ByVEV6IlIAldSj1ZO_NkXNqf8vjyOLmCbEQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const screens = document.querySelectorAll(".screen");
let screenStack = ["screen-roles"];

const logoutBtn = document.getElementById("logout-btn");

function showScreen(id, push = true) {
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  if (push) {
    screenStack.push(id);
  }
  updateNavButtons();

  // show/hide logout button only on dashboards
  if (logoutBtn) {
    if (id === "screen-officer-home" || id === "screen-civilian-home") {
      logoutBtn.style.display = "inline-flex";
    } else {
      logoutBtn.style.display = "none";
    }
  }
}

function updateNavButtons() {
  const backBtn = document.getElementById("back-btn");
  backBtn.disabled = screenStack.length <= 1;
  backBtn.style.opacity = backBtn.disabled ? "0.5" : "1";
}

const cards = document.querySelectorAll(".card");
const continueBtn = document.getElementById("continue-btn");
const roleOutput = document.getElementById("role-output");
let selectedRole = null;

const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = "en";

const translations = {
  en: {
    appName: "TUSKRES - Early Warnings, Safer Communities",
    themeLabel: "Dark",
    screenTitle: "How are you using this app today?",
    screenSubtitle: "Select your role to continue.",
    officerBadge: "Official",
    officerTitle: "Forest Officer",
    officerDesc:
      "View live alerts, patrol routes, and respond to reports from villagers.",
    officerTag: "Secure login",
    officerIndicator: "On duty",
    civilBadge: "Public",
    civilianTitle: "Civilian",
    civilianDesc:
      "Report elephant sightings, danger zones, or crop damage from your village.",
    civilianTag: "Quick report",
    civilianIndicator: "Safe mode",
    continue: "Continue",
    rolePrefix: "Selected",
    brandSub: "Early alerts for human–elephant conflict zones",
    backText: "Back",
    homeText: "Home",
    resetOtpSent: "OTP sent successfully",
    resetOtpVerified: "OTP verified",
    resetPinLabel: "New PIN (6 digits)",
    resetPinConfirmLabel: "Re-enter PIN",
    resetPinMismatch: "Enter proper PIN",
    resetPinMatch: "Verified",
    resetPinSaved: "PIN changed successfully. Redirecting to login…",
    officerLoginTitle: "Forest Officer Login",
    officerLoginSub: "Enter your 8-digit ID and password.",
    officerIdLabel: "Official ID (8 digits)",
    officerPassLabel: "Password",
    officerForgotLink: "Forgot password?",
    officerForgotTitle: "Reset Officer Password",
    officerForgotSub: "Enter your 8-digit official ID.",
    officerForgotIdLabel: "Official ID",
    officerForgotSent:
      "Message sent to the mobile number linked with this ID.",
    officerOtpLabel: "Enter 6-digit code",
    officerOtpWarn: "Code must be 6 digits.",
    officerLoginIdWarn: "ID must be exactly 8 digits.",
    officerLoginPassEmpty: "Password cannot be empty.",
    officerLoginPassWarn: "Enter a 6-digit password to continue.",
    officerLoginBothEmpty: "Enter your ID and password to login.",
    officerLoginChecking: "Checking credentials…",
    officerLoginFailed: "Login failed. Please try again.",
    officerLoginInvalid: "Invalid ID or password.",
    createTitleOfficer: "Create officer account",
    createTitleCivil: "Create civilian account",
    createName: "Name",
    createAge: "Age",
    createDob: "Date of birth",
    createAddress: "House address",
    createPincode: "Pin code",
    createPhone: "Phone number",
    createSendOtp: "SEND OTP",
    createOtpVerified: "OTP verified successfully",
    createPinLabel: "PIN (6 digits)",
    createPinConfirmLabel: "Re-enter PIN",
    createPinError: "PIN must be 6 digits.",
    createEnterFullPassword: "enter full password",
    createPinConfirmed: "confirmed pin",
    createFormError: "Please fill all fields and verify OTP.",
    createAccountBtn: "Create account",
    otpDialogTitle: "Enter OTP",
    otpDialogError: "OTP must be 4 digits.",
    createAccountSaved: "Account created successfully. Redirecting to login…",
    officialIdPopupTitle: "Official ID generated",
    officialIdPopupText: "Your Official ID is: ",

    civilLoginTitle: "Civilian Login",
    civilLoginSub: "Enter your phone number and 6-digit PIN.",
    civilPhoneLabel: "Phone number",
    civilPinLabel: "PIN (6 digits)",
    civilForgotLink: "Forgot PIN?",
    civilForgotTitle: "Reset PIN",
    civilForgotSub: "Enter your registered phone number.",
    civilForgotPhoneLabel: "Phone number",
    civilForgotSent: "Code sent to your mobile number.",
    civilOtpLabel: "Enter 6-digit code",
    civilOtpWarn: "Code must be 6 digits.",
    civilPhoneWarn: "Enter a valid 10-digit phone number.",
    civilPinWarn: "PIN must be 6 digits.",
    civilLoginBothEmpty: "Enter your phone number and PIN to login.",
    civilLoginChecking: "Checking credentials…",
    civilLoginFailed: "Login failed. Please try again.",
    civilLoginInvalid: "Invalid phone or PIN.",
    yellowTitle: "Civilian Home",
    yellowText:
      "You are logged in. Use this screen later to show live warnings and safety tips.",
    officerHomeTitle: "Officer Dashboard",
    officerHomeSub: "Live thermal feeds from patrol zones.",
    tileLabelPrefix: "Thermal feed",
    zoneMainTitle: "Zone feed",
    zoneMainSubtitle: "Detailed live view from this patrol zone.",
    zoneThermalHeading: "Thermal camera live footage",
    zoneRgbHeading: "Camera live footage",
    zoneAudioHeading: "Scaled up acoustic mic recording",
    audioMutedButton: "🔇 Muted",
    audioMutedText: "Muted acoustic recordings",
    audioOnButton: "🔊 Sound on",
    audioOnText: "Unmuted acoustic mic recordings",
    audioNoSource: "No audio source configured for this zone.",
    elephantWarning: "elephant entering warning",
    zoneTitlePrefix: "Zone",
    zoneTitleSuffix: "live feed",
    sendWarningBtn: "Send warning to this zone",
    modalTitle: "Enter secret key to send warning to zone",
    modalPlaceholder: "8-character secret key",
    modalSendBtn: "Send warning",
    modalEmptyKey: "Please enter the secret key.",
    modalSuccessText: "Warning sent successfully.",
    successTickText: "",
  },
  kn: {
    appName: "TUSKRES - Early Warnings, Safer Communities",
    themeLabel: "ಡಾರ್ಕ್",
    screenTitle: "ಇಂದು ನೀವು ಈ ಅಪ್ ಅನ್ನು ಹೇಗೆ ಬಳಸುತ್ತಿರಿ?",
    screenSubtitle: "ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    officerBadge: "ಅಧಿಕಾರಿ",
    officerTitle: "ಅರಣ್ಯ ಅಧಿಕಾರಿ",
    officerDesc:
      "ಗ್ರಾಮಸ್ಥರಿಂದ ಬರುವ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ವರದಿಗಳನ್ನು ನೋಡಿಸಿ ಪ್ರತಿಕ್ರಿಯಿಸಿ.",
    officerTag: "ಭದ್ರ ಲಾಗಿನ್",
    officerIndicator: "ಪರಿವೀಕ್ಷಣೆ",
    civilBadge: "ಸಾಮಾನ್ಯ",
    civilianTitle: "ನಾಗರಿಕ",
    civilianDesc:
      "ಆನೆಗಳ ಕಾಣಿಕೆ, ಅಪಾಯ ಪ್ರದೇಶ, ಬೆಳೆ ಹಾನಿ ಇತ್ಯಾದಿ ವರದಿ ಮಾಡಿ.",
    civilianTag: "ತ್ವರಿತ ವರದಿ",
    civilianIndicator: "ಸುರಕ್ಷಿತ ಮೋಡ್",
    continue: "ಮುಂದುವರಿಸಿ",
    rolePrefix: "ಆಯ್ಕೆ",
    brandSub: "ಮಾನವ–ಆನೆ ಸಂಘರ್ಷ ಪ್ರದೇಶಗಳಿಗೆ ಮುಂಚಿತ ಎಚ್ಚರಿಕೆ",
    backText: "ಹಿಂದೆ",
    homeText: "ಮುಖಪುಟ",
    officerLoginTitle: "ಅರಣ್ಯ ಅಧಿಕಾರಿ ಲಾಗಿನ್",
    officerLoginSub: "ನಿಮ್ಮ 8 ಅಂಕಿಗಳ ID ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.",
    officerIdLabel: "ಅಧಿಕೃತ ID (8 ಅಂಕಿಗಳು)",
    officerPassLabel: "ಪಾಸ್ವರ್ಡ್",
    officerForgotLink: "ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?",
    officerForgotTitle: "ಅಧಿಕಾರಿ ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
    officerForgotSub: "ನಿಮ್ಮ 8 ಅಂಕಿಗಳ ಅಧಿಕೃತ ID ನಮೂದಿಸಿ.",
    officerForgotIdLabel: "ಅಧಿಕೃತ ID",
    officerForgotSent:
      "ಈ ID ಗೆ ಲಿಂಕ್ ಆಗಿರುವ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ.",
    officerOtpLabel: "6 ಅಂಕಿಗಳ ಕೋಡ್ ನಮೂದಿಸಿ",
    officerOtpWarn: "ಕೋಡ್ 6 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    officerLoginIdWarn: "ID ಕಡ್ಡಾಯವಾಗಿ 8 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    officerLoginPassEmpty: "ಪಾಸ್ವರ್ಡ್ ಖಾಲಿ ಇರಬಾರದು.",
    officerLoginPassWarn:
      "ಮುಂದುವರಿಸಲು 6 ಅಂಕಿಗಳ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.",
    officerLoginBothEmpty:
      "ಲಾಗಿನ್ ಮಾಡಲು ID ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.",
    officerLoginChecking: "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…",
    officerLoginFailed: "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    officerLoginInvalid: "ID ಅಥವಾ ಪಾಸ್ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.",
    resetOtpSent: "OTP ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    resetOtpVerified: "OTP ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    resetPinLabel: "ಹೊಸ PIN (6 ಅಂಕಿಗಳು)",
    resetPinConfirmLabel: "PIN ಮರುನಮೂದಿಸಿ",
    resetPinMismatch: "ಸರಿಯಾದ PIN ನಮೂದಿಸಿ",
    resetPinMatch: "ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    resetPinSaved: "PIN ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಗಿದೆ. ಲಾಗಿನ್ ಪರದೆಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ…",
    createTitleOfficer: "ಅರಣ್ಯ ಅಧಿಕಾರಿ ಖಾತೆ ರಚಿಸಿ",
    createTitleCivil: "ನಾಗರಿಕ ಖಾತೆ ರಚಿಸಿ",
    createName: "ಹೆಸರು",
    createAge: "ವಯಸ್ಸು",
    createDob: "ಹುಟ್ಟು ದಿನಾಂಕ",
    createAddress: "ಮನೆ ವಿಳಾಸ",
    createPincode: "ಪಿನ್ ಕೋಡ್",
    createPhone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    createSendOtp: "OTP ಕಳುಹಿಸಿ",
    createOtpVerified: "OTP ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    createPinLabel: "PIN (6 ಅಂಕಿಗಳು)",
    createPinConfirmLabel: "PIN ಮರು ನಮೂದಿಸಿ",
    createPinError: "PIN ಕಡ್ಡಾಯವಾಗಿ 6 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    createEnterFullPassword: "ಪೂರ್ಣ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ",
    createPinConfirmed: "PIN ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    createFormError: "ಎಲ್ಲ ವಿವರಗಳನ್ನು ತುಂಬಿ OTP ಪರಿಶೀಲಿಸಿ.",
    createAccountBtn: "ಖಾತೆ ರಚಿಸಿ",
    otpDialogTitle: "OTP ನಮೂದಿಸಿ",
    otpDialogError: "OTP 4 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    createAccountSaved: "ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ. ಲಾಗಿನ್ ಪರದೆಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ…",
    officialIdPopupTitle: "ಅಧಿಕೃತ ID ರಚಿಸಲಾಗಿದೆ",
    officialIdPopupText: "ನಿಮ್ಮ ಅಧಿಕೃತ ID: ",

    civilLoginTitle: "ನಾಗರಿಕ ಲಾಗಿನ್",
    civilLoginSub: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು 6 ಅಂಕಿಗಳ PIN ನಮೂದಿಸಿ.",
    civilPhoneLabel: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    civilPinLabel: "PIN (6 ಅಂಕಿಗಳು)",
    civilForgotLink: "PIN ಮರೆತಿರಾ?",
    civilForgotTitle: "PIN ಮರುಹೊಂದಿಸಿ",
    civilForgotSub: "ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    civilForgotPhoneLabel: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    civilForgotSent: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿದೆ.",
    civilOtpLabel: "6 ಅಂಕಿಗಳ ಕೋಡ್ ನಮೂದಿಸಿ",
    civilOtpWarn: "ಕೋಡ್ 6 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    civilPhoneWarn: "ಸರಿಯಾದ 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    civilPinWarn: "PIN 6 ಅಂಕಿಗಳಾಗಿರಬೇಕು.",
    civilLoginBothEmpty:
      "ಲಾಗಿನ್ ಮಾಡಲು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು PIN ನಮೂದಿಸಿ.",
    civilLoginChecking: "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…",
    civilLoginFailed: "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    civilLoginInvalid: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ PIN ತಪ್ಪಾಗಿದೆ.",
    yellowTitle: "ನಾಗರಿಕ ಮುಖ್ಯ ಪರದೆ",
    yellowText:
      "ನೀವು ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ. ಮುಂದೆ ಇಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆ ತೋರಿಸಬಹುದು.",
    officerHomeTitle: "ಅಧಿಕಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    officerHomeSub: "ಪರಿವೀಕ್ಷಣಾ ವಲಯಗಳಿಂದ ತಾಪಮಾನ ಚಿತ್ರಣಗಳು.",
    tileLabelPrefix: "ತಾಪಮಾನ ಫೀಡ್",
    zoneMainTitle: "ವಲಯ ಫೀಡ್",
    zoneMainSubtitle:
      "ಈ ಪರಿವೀಕ್ಷಣಾ ವಲಯದಿಂದ ವಿವರವಾದ ನೇರ ದೃಶ್ಯ.",
    zoneThermalHeading: "ತಾಪಮಾನ ಕ್ಯಾಮೆರಾ ನೇರ ಚಿತ್ರ",
    zoneRgbHeading: "ಕ್ಯಾಮೆರಾ ನೇರ ಚಿತ್ರ",
    zoneAudioHeading: "ವಿಸ್ತರಿಸಿದ ಧ್ವನಿಮಾಪಕ ದಾಖಲೆ",
    audioMutedButton: "🔇 ಮ್ಯೂಟ್",
    audioMutedText: "ಧ್ವನಿ ದಾಖಲಾತಿಗಳು ಮ್ಯೂಟ್ ಆಗಿವೆ",
    audioOnButton: "🔊 ಧ್ವನಿ ಆನ್",
    audioOnText: "ಧ್ವನಿ ದಾಖಲಾತಿಗಳು ಆನ್ ಆಗಿವೆ",
    audioNoSource: "ಈ ವಲಯಕ್ಕೆ ಧ್ವನಿ ಮೂಲ ಸಂರಚನೆ ಇಲ್ಲ.",
    elephantWarning: "ಆನೆ ಪ್ರವೇಶ ಎಚ್ಚರಿಕೆ",
    zoneTitlePrefix: "ವಲಯ",
    zoneTitleSuffix: "ನೇರ ಫೀಡ್",
    sendWarningBtn: "ಈ ವಲಯಕ್ಕೆ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
    modalTitle: "ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲು ರಹಸ್ಯ ಕೀ ನಮೂದಿಸಿ",
    modalPlaceholder: "8 ಅಕ್ಷರಗಳ ರಹಸ್ಯ ಕೀ",
    modalSendBtn: "ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
    modalEmptyKey: "ದಯವಿಟ್ಟು ರಹಸ್ಯ ಕೀ ನಮೂದಿಸಿ.",
    modalSuccessText: "ಎಚ್ಚರಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ.",
    successTickText: "",
  },
  hi: {
    appName: "TUSKRES - Early Warnings Safer Communities",
    themeLabel: "डार्क",
    screenTitle: "आज आप यह ऐप कैसे उपयोग कर रहे हैं?",
    screenSubtitle: "जारी रखने के लिए अपनी भूमिका चुनें.",
    officerBadge: "अधिकारी",
    officerTitle: "वन अधिकारी",
    officerDesc:
      "गाँव वालों की रिपोर्ट और अलर्ट देखें और तुरंत कार्यवाही करें.",
    officerTag: "सुरक्षित लॉगिन",
    officerIndicator: "ड्यूटी पर",
    civilBadge: "सार्वजनिक",
    civilianTitle: "नागरिक",
    civilianDesc:
      "हाथी दिखने, खतरे वाले क्षेत्र या फसल नुकसान की सूचना दें.",
    civilianTag: "त्वरित रिपोर्ट",
    civilianIndicator: "सेफ मोड",
    continue: "जारी रखें",
    rolePrefix: "चुना गया",
    brandSub: "मानव–हाथी संघर्ष क्षेत्रों के लिए शुरुआती चेतावनी",
    backText: "वापस",
    homeText: "होम",
    resetOtpSent: "OTP सफलतापूर्वक भेजा गया",
    resetOtpVerified: "OTP सत्यापित",
    resetPinLabel: "नया PIN (6 अंक)",
    resetPinConfirmLabel: "PIN दोबारा दर्ज करें",
    resetPinMismatch: "सही PIN दर्ज करें",
    resetPinMatch: "सत्यापित",
    resetPinSaved: "PIN सफलतापूर्वक बदल दिया गया. लॉगिन पर रीडायरेक्ट किया जा रहा है…",
    officerLoginTitle: "वन अधिकारी लॉगिन",
    officerLoginSub: "अपना 8 अंकों का ID और पासवर्ड दर्ज करें.",
    officerIdLabel: "आधिकारिक ID (8 अंक)",
    officerPassLabel: "पासवर्ड",
    officerForgotLink: "पासवर्ड भूल गए?",
    officerForgotTitle: "अधिकारी पासवर्ड रीसेट",
    officerForgotSub: "अपना 8 अंकों का आधिकारिक ID दर्ज करें.",
    officerForgotIdLabel: "आधिकारिक ID",
    officerForgotSent:
      "इस ID से जुड़े मोबाइल नंबर पर संदेश भेज दिया गया है.",
    officerOtpLabel: "6 अंकों का कोड दर्ज करें",
    officerOtpWarn: "कोड 6 अंकों का होना चाहिए.",
    officerLoginIdWarn: "ID बिल्कुल 8 अंकों का होना चाहिए.",
    officerLoginPassEmpty: "पासवर्ड खाली नहीं हो सकता.",
    officerLoginPassWarn:
      "आगे बढ़ने के लिए 6 अंकों का पासवर्ड दर्ज करें.",
    officerLoginBothEmpty:
      "लॉगिन के लिए ID और पासवर्ड दर्ज करें.",
    officerLoginChecking: "प्रमाण जांचे जा रहे हैं…",
    officerLoginFailed: "लॉगिन असफल रहा. कृपया पुनः प्रयास करें.",
    officerLoginInvalid: "ID या पासवर्ड गलत है.",
    createTitleOfficer: "वन अधिकारी खाता बनाएं",
    createTitleCivil: "नागरिक खाता बनाएं",
    createName: "नाम",
    createAge: "आयु",
    createDob: "जन्म तिथि",
    createAddress: "घर का पता",
    createPincode: "पिन कोड",
    createPhone: "मोबाइल नंबर",
    createSendOtp: "OTP भेजें",
    createOtpVerified: "OTP सफलतापूर्वक सत्यापित",
    createPinLabel: "PIN (6 अंक)",
    createPinConfirmLabel: "PIN दोबारा दर्ज करें",
    createPinError: "PIN 6 अंकों का होना चाहिए.",
    createEnterFullPassword: "पूरा पासवर्ड दर्ज करें",
    createPinConfirmed: "PIN पुष्टि हुई",
    createFormError: "सभी विवरण भरें और OTP सत्यापित करें.",
    createAccountBtn: "खाता बनाएं",
    otpDialogTitle: "OTP दर्ज करें",
    otpDialogError: "OTP 4 अंकों का होना चाहिए.",
    createAccountSaved: "खाता सफलतापूर्वक बन गया. लॉगिन पर रीडायरेक्ट किया जा रहा है…",
    officialIdPopupTitle: "आधिकारिक ID बनाई गई",
    officialIdPopupText: "आपकी आधिकारिक ID: ",

    civilLoginTitle: "नागरिक लॉगिन",
    civilLoginSub: "अपना मोबाइल नंबर और 6 अंकों का PIN दर्ज करें.",
    civilPhoneLabel: "मोबाइल नंबर",
    civilPinLabel: "PIN (6 अंक)",
    civilForgotLink: "PIN भूल गए?",
    civilForgotTitle: "PIN रीसेट",
    civilForgotSub: "अपना रजिस्टर्ड मोबाइल नंबर दर्ज करें.",
    civilForgotPhoneLabel: "मोबाइल नंबर",
    civilForgotSent: "आपके मोबाइल नंबर पर कोड भेज दिया गया है.",
    civilOtpLabel: "6 अंकों का कोड दर्ज करें",
    civilOtpWarn: "कोड 6 अंकों का होना चाहिए.",
    civilPhoneWarn: "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें.",
    civilPinWarn: "PIN 6 अंकों का होना चाहिए.",
    civilLoginBothEmpty:
      "लॉगिन के लिए मोबाइल नंबर और PIN दर्ज करें.",
    civilLoginChecking: "प्रमाण जांचे जा रहे हैं…",
    civilLoginFailed: "लॉगिन असफल रहा. कृपया पुनः प्रयास करें.",
    civilLoginInvalid: "मोबाइल नंबर या PIN गलत है.",
    yellowTitle: "नागरिक होम",
    yellowText:
      "आप लॉगिन हो चुके हैं. आगे यहाँ चेतावनियाँ और सुरक्षा सुझाव दिखाए जा सकते हैं.",
    officerHomeTitle: "अधिकारी डैशबोर्ड",
    officerHomeSub: "पेट्रोल ज़ोन से लाइव थर्मल फीड.",
    tileLabelPrefix: "थर्मल फ़ीड",
    zoneMainTitle: "ज़ोन फ़ीड",
    zoneMainSubtitle: "इस पेट्रोल ज़ोन का विस्तृत लाइव व्यू.",
    zoneThermalHeading: "थर्मल कैमरा लाइव फुटेज",
    zoneRgbHeading: "कैमरा लाइव फुटेज",
    zoneAudioHeading: "विस्तारित ध्वनि रिकॉर्डिंग",
    audioMutedButton: "🔇 म्यूट",
    audioMutedText: "ध्वनि रिकॉर्डिंग म्यूट है",
    audioOnButton: "🔊 साउंड ऑन",
    audioOnText: "ध्वनि रिकॉर्डिंग ऑन है",
    audioNoSource:
      "इस ज़ोन के लिए कोई ऑडियो स्रोत कॉन्फ़िगर नहीं है.",
    elephantWarning: "elephant entering warning",
    zoneTitlePrefix: "ज़ोन",
    zoneTitleSuffix: "लाइव फ़ीड",
    sendWarningBtn: "इस ज़ोन को चेतावनी भेजें",
    modalTitle:
      "चेतावनी भेजने के लिए सीक्रेट की दर्ज करें",
    modalPlaceholder: "8-अक्षरों की सीक्रेट की",
    modalSendBtn: "चेतावनी भेजें",
    modalEmptyKey: "कृपया सीक्रेट की दर्ज करें.",
    modalSuccessText:
      "चेतावनी सफलतापूर्वक भेज दी गई है.",
    successTickText: "",
  },
};

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById("brand-sub").textContent = t.brandSub;
  document.getElementById("screen-title").textContent = t.screenTitle;
  document.getElementById("screen-subtitle").textContent =
    t.screenSubtitle;

  document.querySelector(".app-name").textContent = t.appName;
  document.getElementById("theme-label-text").textContent =
    t.themeLabel;

  // Role screen
  document.getElementById("officer-badge-text").textContent =
    t.officerBadge;
  document.getElementById("officer-title").textContent =
    t.officerTitle;
  document.getElementById("officer-desc").textContent =
    t.officerDesc;
  document.getElementById("officer-tag").textContent = t.officerTag;
  document.getElementById("officer-indicator").textContent =
    t.officerIndicator;

  document.getElementById("civil-badge").textContent = t.civilBadge;
  document.getElementById("civilian-title").textContent =
    t.civilianTitle;
  document.getElementById("civilian-desc").textContent =
    t.civilianDesc;
  document.getElementById("civilian-tag").textContent =
    t.civilianTag;
  document.getElementById("civilian-indicator").textContent =
    t.civilianIndicator;

  continueBtn.textContent = t.continue;

  // Officer login + forgot
  document.getElementById("officer-login-title").textContent =
    t.officerLoginTitle;
  document.getElementById("officer-login-sub").textContent =
    t.officerLoginSub;
  document.getElementById("officer-id-label").textContent =
    t.officerIdLabel;
  document.getElementById("officer-pass-label").textContent =
    t.officerPassLabel;
  document.getElementById("officer-forgot").textContent =
    t.officerForgotLink;

  document.getElementById("officer-forgot-title").textContent =
    t.officerForgotTitle;
  document.getElementById("officer-forgot-sub").textContent =
    t.officerForgotSub;
  document.getElementById("officer-forgot-id-label").textContent =
    t.officerForgotIdLabel;

  // Civilian login + forgot
  document.getElementById("civil-login-title").textContent =
    t.civilLoginTitle;
  document.getElementById("civil-login-sub").textContent =
    t.civilLoginSub;
  document.getElementById("civil-phone-label").textContent =
    t.civilPhoneLabel;
  document.getElementById("civil-pin-label").textContent =
    t.civilPinLabel;
  document.getElementById("civil-forgot").textContent =
    t.civilForgotLink;

  document.getElementById("civil-forgot-title").textContent =
    t.civilForgotTitle;
  document.getElementById("civil-forgot-sub").textContent =
    t.civilForgotSub;
  document.getElementById("civil-forgot-phone-label").textContent =
    t.civilForgotPhoneLabel;

  // Civilian home
  document.getElementById("yellow-title").textContent =
    t.yellowTitle;
  document.getElementById("yellow-text").textContent =
    t.yellowText;

  // Nav texts
  document.getElementById("back-text").textContent = t.backText;
  document.getElementById("home-text").textContent = t.homeText;

  // Officer home + tiles
  document.getElementById("officer-home-title").textContent =
    t.officerHomeTitle;
  document.getElementById("officer-home-sub").textContent =
    t.officerHomeSub;
  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById("tile-label-" + i);
    if (el) el.textContent = `${t.tileLabelPrefix} ${i}`;
  }

  const ew = document.getElementById("ele-warning");
  if (ew) ew.textContent = t.elephantWarning;

  // Zone feed
  document.getElementById("zone-main-title").textContent =
    t.zoneMainTitle;
  document.getElementById("zone-main-subtitle").textContent =
    t.zoneMainSubtitle;
  document.getElementById("zone-thermal-heading").textContent =
    t.zoneThermalHeading;
  document.getElementById("zone-rgb-heading").textContent =
    t.zoneRgbHeading;
  document.getElementById("zone-audio-heading").textContent =
    t.zoneAudioHeading;

  const audioToggleBtn =
    document.getElementById("audio-toggle-btn");
  const audioStatusText =
    document.getElementById("audio-status-text");
  audioToggleBtn.textContent = t.audioMutedButton;
  audioStatusText.textContent = t.audioMutedText;

  document.getElementById("send-warning-btn").textContent =
    t.sendWarningBtn;

  // Modal
  document.getElementById("modal-title-text").textContent =
    t.modalTitle;
  document.getElementById("secret-key-input").placeholder =
    t.modalPlaceholder;
  document.getElementById("modal-send-btn").textContent =
    t.modalSendBtn;
  document.getElementById("success-text-msg").textContent =
    t.modalSuccessText;

  if (selectedRole) {
    roleOutput.textContent =
      t.rolePrefix + ": " + selectedRole;
  }
  // Create-account modal labels
  document.getElementById("create-modal-title").textContent =
    t.createTitleCivil; // default; will change by role when opening
  document.getElementById("create-name-label").textContent = t.createName;
  document.getElementById("create-age-label").textContent = t.createAge;
  document.getElementById("create-dob-label").textContent = t.createDob;
  document.getElementById("create-address-label").textContent = t.createAddress;
  document.getElementById("create-pincode-label").textContent = t.createPincode;
  document.getElementById("create-phone-label").textContent = t.createPhone;
  document.getElementById("create-send-otp").textContent = t.createSendOtp;
  document.getElementById("create-pin-label").textContent = t.createPinLabel;
  document.getElementById("create-pin-confirm-label").textContent =
    t.createPinConfirmLabel;
  document.getElementById("create-account-confirm-btn").textContent =
    t.createAccountBtn;

  // OTP dialog
  document.getElementById("otp-dialog-title").textContent = t.otpDialogTitle;


  // Zone title bar, if visible
  const zt = document.getElementById("zone-title");
  if (zt.style.display === "block" && zt.dataset.zoneNumber) {
    zt.textContent =
      t.zoneTitlePrefix +
      " " +
      zt.dataset.zoneNumber +
      " " +
      zt.dataset.zoneNumber +
      " " +
      t.zoneTitleSuffix;
  }
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    langButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyLanguage(btn.dataset.lang);
  });
});

applyLanguage("en");

function setSelected(card) {
  cards.forEach((c) => c.classList.remove("active"));
  card.classList.add("active");
  selectedRole = card.dataset.role;
  continueBtn.disabled = false;
  roleOutput.textContent =
    translations[currentLang].rolePrefix +
    ": " +
    selectedRole;
}

cards.forEach((card) => {
  card.addEventListener("click", () => setSelected(card));
});

continueBtn.addEventListener("click", () => {
  if (!selectedRole) return;
  if (selectedRole === "Forest Officer") {
    showScreen("screen-officer-login");
  } else {
    showScreen("screen-civilian-login");
  }
});

document
  .getElementById("back-btn")
  .addEventListener("click", () => {
    if (screenStack.length > 1) {
      screenStack.pop();
      const id = screenStack[screenStack.length - 1];
      screens.forEach((s) => s.classList.remove("active"));
      document.getElementById(id).classList.add("active");
      if (id !== "screen-zone-feed") {
        const zt = document.getElementById("zone-title");
        zt.style.display = "none";
        zt.textContent = "";
        delete zt.dataset.zoneNumber;
      }
      updateNavButtons();

      // adjust logout button when navigating back
      if (logoutBtn) {
        if (
          id === "screen-officer-home" ||
          id === "screen-civilian-home"
        ) {
          logoutBtn.style.display = "inline-flex";
        } else {
          logoutBtn.style.display = "none";
        }
      }
    }
  });

document.getElementById("home-btn").addEventListener("click", () => {
  screenStack = ["screen-roles"];
  const zt = document.getElementById("zone-title");
  zt.style.display = "none";
  zt.textContent = "";
  delete zt.dataset.zoneNumber;
  showScreen("screen-roles", false);
});

document.querySelectorAll(".eye-toggle").forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.dataset.target;
    const input = document.getElementById(targetId);
    input.type =
      input.type === "password" ? "text" : "password";
  });
});

const officerIdInput = document.getElementById("officer-id");
officerIdInput.addEventListener("input", () => {
  officerIdInput.value = officerIdInput.value
    .replace(/\D/g, "")
    .slice(0, 8);
});

const civilPinInput = document.getElementById("civil-pin");
civilPinInput.addEventListener("input", () => {
  civilPinInput.value = civilPinInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
});

// Officer login button (uses pin from Supabase)
document
  .getElementById("officer-login-btn")
  .addEventListener("click", async () => {
    const t = translations[currentLang];
    const id = officerIdInput.value.trim();
    const pass = document
      .getElementById("officer-pass")
      .value.trim();
    const warn = document.getElementById("officer-warning");

    if (!id && !pass) {
      warn.textContent = t.officerLoginBothEmpty;
      return;
    }
    if (!/^\d{8}$/.test(id)) {
      warn.textContent = t.officerLoginIdWarn;
      return;
    }
    if (!pass) {
      warn.textContent = t.officerLoginPassEmpty;
      return;
    }
    if (!/^\d{6}$/.test(pass)) {
      warn.textContent = t.officerLoginPassWarn;
      return;
    }

    warn.textContent = t.officerLoginChecking;

    const { data, error } = await supabase
      .from("officers")
      .select("*")
      .eq("official_id", id)      // IMPORTANT: official_id column
      .eq("pin", pass)           // IMPORTANT: pin column
      .maybeSingle();

    if (error) {
      console.error(error);
      warn.textContent = t.officerLoginFailed;
      return;
    }
    if (!data) {
      warn.textContent = t.officerLoginInvalid;
      return;
    }

    warn.textContent = "";
    showScreen("screen-officer-home");
  });

// "Forgot password?" link → open officer reset screen
const officerForgotLink = document.getElementById("officer-forgot");
officerForgotLink.addEventListener("click", () => {
  showScreen("screen-officer-forgot");
});

// ----- OFFICER FORGOT PASSWORD FLOW -----
const officerForgotBtn = document.getElementById("officer-forgot-btn");
const officerForgotMsg = document.getElementById("officer-forgot-msg");
const officerForgotForm =
  officerForgotBtn.closest(".screen").querySelector(".form");

const officerForgotIdInput = document.getElementById("officer-forgot-id");

// group for OTP input
const officerOtpGroup = document.createElement("div");
officerOtpGroup.className = "form-group";
officerOtpGroup.style.display = "none";
officerOtpGroup.innerHTML = `
  <label id="officer-otp-label" for="officer-otp">OTP</label>
  <input id="officer-otp" type="text" inputmode="numeric" maxlength="4" placeholder="____" />
`;
officerForgotForm.appendChild(officerOtpGroup);

// group for new PIN + confirm PIN
const officerNewPinGroup = document.createElement("div");
officerNewPinGroup.className = "form-group";
officerNewPinGroup.style.display = "none";
officerNewPinGroup.innerHTML = `
  <label id="officer-new-pin-label" for="officer-new-pin">New PIN (6 digits)</label>
  <input id="officer-new-pin" type="password" inputmode="numeric" maxlength="6" placeholder="••••••" />
`;
officerForgotForm.appendChild(officerNewPinGroup);

const officerConfirmPinGroup = document.createElement("div");
officerConfirmPinGroup.className = "form-group";
officerConfirmPinGroup.style.display = "none";
officerConfirmPinGroup.innerHTML = `
  <label id="officer-confirm-pin-label" for="officer-confirm-pin">Re-enter PIN</label>
  <input id="officer-confirm-pin" type="password" inputmode="numeric" maxlength="6" placeholder="••••••" />
  <div id="officer-confirm-pin-status" class="warning"></div>
`;
officerForgotForm.appendChild(officerConfirmPinGroup);

// wire up inputs
const officerOtpInput = officerOtpGroup.querySelector("#officer-otp");
const officerNewPinInput = officerNewPinGroup.querySelector("#officer-new-pin");
const officerConfirmPinInput =
  officerConfirmPinGroup.querySelector("#officer-confirm-pin");
const officerConfirmPinStatus =
  officerConfirmPinGroup.querySelector("#officer-confirm-pin-status");

// numeric restrictions
officerOtpInput.addEventListener("input", () => {
  officerOtpInput.value = officerOtpInput.value.replace(/\D/g, "").slice(0, 4);
});

officerNewPinInput.addEventListener("input", () => {
  officerNewPinInput.value = officerNewPinInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
  compareOfficerPins();
});

officerConfirmPinInput.addEventListener("input", () => {
  officerConfirmPinInput.value = officerConfirmPinInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
  compareOfficerPins();
});

// compare and show messages in red/green
function compareOfficerPins() {
  const t = translations[currentLang];
  const p1 = officerNewPinInput.value.trim();
  const p2 = officerConfirmPinInput.value.trim();
  if (!p1 || !p2) {
    officerConfirmPinStatus.textContent = "";
    officerConfirmPinStatus.style.color = "#ff7043"; // red
    return;
  }
  if (p1.length !== 6 || p2.length !== 6 || p1 !== p2) {
    officerConfirmPinStatus.textContent = t.resetPinMismatch;
    officerConfirmPinStatus.style.color = "#ff5252"; // red
  } else {
    officerConfirmPinStatus.textContent = t.resetPinMatch;
    officerConfirmPinStatus.style.color = "#4caf50"; // green
  }
}

// when "Send reset message" is clicked
officerForgotBtn.addEventListener("click", () => {
  const t = translations[currentLang];
  const id = officerForgotIdInput.value.trim();
  if (!/^\d{8}$/.test(id)) {
    officerForgotMsg.textContent = t.officerLoginIdWarn;
    officerForgotMsg.style.color = "#ff5252";
    return;
  }
  // show green success for OTP sent
  officerForgotMsg.textContent = t.resetOtpSent;
  officerForgotMsg.style.color = "#4caf50";
  officerOtpGroup.style.display = "block";
  document.getElementById("officer-otp-label").textContent = "OTP";
});

// OTP verify: any 4 digits accepted
officerOtpInput.addEventListener("blur", handleOfficerOtpVerify);
officerOtpInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleOfficerOtpVerify();
});

function handleOfficerOtpVerify() {
  const t = translations[currentLang];
  const code = officerOtpInput.value.trim();
  // accept any 4-digit input as "verified"
  if (!/^\d{4}$/.test(code)) {
    officerForgotMsg.textContent = t.officerOtpWarn;
    officerForgotMsg.style.color = "#ff5252";
    return;
  }
  officerForgotMsg.textContent = t.resetOtpVerified;
  officerForgotMsg.style.color = "#4caf50";

  // show new PIN fields
  officerNewPinGroup.style.display = "block";
  officerConfirmPinGroup.style.display = "block";
  document.getElementById("officer-new-pin-label").textContent =
    translations[currentLang].resetPinLabel;
  document.getElementById("officer-confirm-pin-label").textContent =
    translations[currentLang].resetPinConfirmLabel;
}

// when user finishes confirm PIN (blur or Enter), save to supabase
officerConfirmPinInput.addEventListener("blur", saveOfficerNewPin);
officerConfirmPinInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") saveOfficerNewPin();
});

async function saveOfficerNewPin() {
  const t = translations[currentLang];
  const id = officerForgotIdInput.value.trim();
  const p1 = officerNewPinInput.value.trim();
  const p2 = officerConfirmPinInput.value.trim();

  if (!/^\d{6}$/.test(p1) || p1 !== p2) {
    officerConfirmPinStatus.textContent = t.resetPinMismatch;
    officerConfirmPinStatus.style.color = "#ff5252";
    return;
  }

  const { data, error } = await supabase
    .from("officers")          // officers table
    .update({ pin: p1 })       // update pin column
    .eq("official_id", id);    // USE official_id (same as login)

  if (error) {
    console.error(error);
    officerConfirmPinStatus.textContent = t.officerLoginFailed;
    officerConfirmPinStatus.style.color = "#ff5252";
    return;
  }

  officerConfirmPinStatus.textContent = t.resetPinSaved;
  officerConfirmPinStatus.style.color = "#4caf50";

  setTimeout(() => {
    officerOtpGroup.style.display = "none";
    officerNewPinGroup.style.display = "none";
    officerConfirmPinGroup.style.display = "none";
    officerForgotMsg.textContent = "";
    officerForgotIdInput.value = "";
    officerOtpInput.value = "";
    officerNewPinInput.value = "";
    officerConfirmPinInput.value = "";
    officerConfirmPinStatus.textContent = "";
    showScreen("screen-officer-login");
  }, 1500);
}



// Civilian login button (uses pin from Supabase)
document
  .getElementById("civil-login-btn")
  .addEventListener("click", async () => {
    const t = translations[currentLang];
    const phone = document
      .getElementById("civil-phone")
      .value.trim();
    const pin = civilPinInput.value.trim();
    const warn = document.getElementById("civil-warning");

    if (!phone && !pin) {
      warn.textContent = t.civilLoginBothEmpty;
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      warn.textContent = t.civilPhoneWarn;
      return;
    }
    if (!/^\d{6}$/.test(pin)) {
      warn.textContent = t.civilPinWarn;
      return;
    }

    warn.textContent = t.civilLoginChecking;

    const { data, error } = await supabase
      .from("civilians")
      .select("*")
      .eq("phone", phone)        // phone column
      .eq("pin", pin)           // pin column
      .maybeSingle();

    if (error) {
      console.error(error);
      warn.textContent = t.civilLoginFailed;
      return;
    }
    if (!data) {
      warn.textContent = t.civilLoginInvalid;
      return;
    }

    warn.textContent = "";
    showScreen("screen-civilian-home");

    setTimeout(() => {
      const eleWarn = document.getElementById("civil-ele-warning");
      if (eleWarn) {
        eleWarn.style.display = "flex";
      }
    }, 10000);
  });

// "Forgot PIN?" link → open civilian reset screen
document
  .getElementById("civil-forgot")
  .addEventListener("click", () => {
    showScreen("screen-civilian-forgot");
  });

// ----- CIVILIAN FORGOT PIN FLOW -----
const civilForgotBtn = document.getElementById("civil-forgot-btn");
const civilForgotMsg = document.getElementById("civil-forgot-msg");
const civilForgotForm =
  civilForgotBtn.closest(".screen").querySelector(".form");

const civilForgotPhoneInput = document.getElementById("civil-forgot-phone");

// OTP group
const civilOtpGroup = document.createElement("div");
civilOtpGroup.className = "form-group";
civilOtpGroup.style.display = "none";
civilOtpGroup.innerHTML = `
  <label id="civil-otp-label" for="civil-otp">OTP</label>
  <input id="civil-otp" type="text" inputmode="numeric" maxlength="4" placeholder="____" />
`;
civilForgotForm.appendChild(civilOtpGroup);

// new PIN + confirm PIN groups
const civilNewPinGroup = document.createElement("div");
civilNewPinGroup.className = "form-group";
civilNewPinGroup.style.display = "none";
civilNewPinGroup.innerHTML = `
  <label id="civil-new-pin-label" for="civil-new-pin">New PIN (6 digits)</label>
  <input id="civil-new-pin" type="password" inputmode="numeric" maxlength="6" placeholder="••••••" />
`;
civilForgotForm.appendChild(civilNewPinGroup);

const civilConfirmPinGroup = document.createElement("div");
civilConfirmPinGroup.className = "form-group";
civilConfirmPinGroup.style.display = "none";
civilConfirmPinGroup.innerHTML = `
  <label id="civil-confirm-pin-label" for="civil-confirm-pin">Re-enter PIN</label>
  <input id="civil-confirm-pin" type="password" inputmode="numeric" maxlength="6" placeholder="••••••" />
  <div id="civil-confirm-pin-status" class="warning"></div>
`;
civilForgotForm.appendChild(civilConfirmPinGroup);

// wire references
const civilOtpInput = civilOtpGroup.querySelector("#civil-otp");
const civilNewPinInput = civilNewPinGroup.querySelector("#civil-new-pin");
const civilConfirmPinInput =
  civilConfirmPinGroup.querySelector("#civil-confirm-pin");
const civilConfirmPinStatus =
  civilConfirmPinGroup.querySelector("#civil-confirm-pin-status");

// numeric restrictions
civilOtpInput.addEventListener("input", () => {
  civilOtpInput.value = civilOtpInput.value.replace(/\D/g, "").slice(0, 4);
});

civilNewPinInput.addEventListener("input", () => {
  civilNewPinInput.value = civilNewPinInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
  compareCivilPins();
});

civilConfirmPinInput.addEventListener("input", () => {
  civilConfirmPinInput.value = civilConfirmPinInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
  compareCivilPins();
});

// compare and show red/green text
function compareCivilPins() {
  const t = translations[currentLang];
  const p1 = civilNewPinInput.value.trim();
  const p2 = civilConfirmPinInput.value.trim();
  if (!p1 || !p2) {
    civilConfirmPinStatus.textContent = "";
    civilConfirmPinStatus.style.color = "#ff7043"; // red
    return;
  }
  if (p1.length !== 6 || p2.length !== 6 || p1 !== p2) {
    civilConfirmPinStatus.textContent = t.resetPinMismatch;
    civilConfirmPinStatus.style.color = "#ff5252";
  } else {
    civilConfirmPinStatus.textContent = t.resetPinMatch;
    civilConfirmPinStatus.style.color = "#4caf50";
  }
}

// initial button click: take phone, show OTP sent
civilForgotBtn.addEventListener("click", () => {
  const t = translations[currentLang];
  const phone = civilForgotPhoneInput.value.trim();
  if (!/^\d{10}$/.test(phone)) {
    civilForgotMsg.textContent = t.civilPhoneWarn;
    civilForgotMsg.style.color = "#ff5252";
    return;
  }
  // green "OTP sent successfully"
  civilForgotMsg.textContent = t.resetOtpSent;
  civilForgotMsg.style.color = "#4caf50";
  civilOtpGroup.style.display = "block";
  document.getElementById("civil-otp-label").textContent = "OTP";
});

// OTP verify: any 4 digits accepted
civilOtpInput.addEventListener("blur", handleCivilOtpVerify);
civilOtpInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleCivilOtpVerify();
});

function handleCivilOtpVerify() {
  const t = translations[currentLang];
  const code = civilOtpInput.value.trim();
  if (!/^\d{4}$/.test(code)) {
    civilForgotMsg.textContent = t.civilOtpWarn;
    civilForgotMsg.style.color = "#ff5252";
    return;
  }
  // "otp verified" in green
  civilForgotMsg.textContent = t.resetOtpVerified;
  civilForgotMsg.style.color = "#4caf50";

  // show PIN fields
  civilNewPinGroup.style.display = "block";
  civilConfirmPinGroup.style.display = "block";
  document.getElementById("civil-new-pin-label").textContent =
    translations[currentLang].resetPinLabel;
  document.getElementById("civil-confirm-pin-label").textContent =
    translations[currentLang].resetPinConfirmLabel;
}

// when confirm PIN is done, save to Supabase
civilConfirmPinInput.addEventListener("blur", saveCivilNewPin);
civilConfirmPinInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") saveCivilNewPin();
});

async function saveCivilNewPin() {
  const t = translations[currentLang];
  const phone = civilForgotPhoneInput.value.trim();
  const p1 = civilNewPinInput.value.trim();
  const p2 = civilConfirmPinInput.value.trim();

  if (!/^\d{6}$/.test(p1) || p1 !== p2) {
    civilConfirmPinStatus.textContent = t.resetPinMismatch;
    civilConfirmPinStatus.style.color = "#ff5252";
    return;
  }

  const { error } = await supabase
    .from("civilians")        // civilians table
    .update({ pin: p1 })      // update pin column
    .eq("phone", phone);      // match by phone

  if (error) {
    console.error(error);
    civilConfirmPinStatus.textContent = t.civilLoginFailed;
    civilConfirmPinStatus.style.color = "#ff5252";
    return;
  }

  civilConfirmPinStatus.textContent = t.resetPinSaved;
  civilConfirmPinStatus.style.color = "#4caf50";

  setTimeout(() => {
    civilOtpGroup.style.display = "none";
    civilNewPinGroup.style.display = "none";
    civilConfirmPinGroup.style.display = "none";
    civilForgotMsg.textContent = "";
    civilForgotPhoneInput.value = "";
    civilOtpInput.value = "";
    civilNewPinInput.value = "";
    civilConfirmPinInput.value = "";
    civilConfirmPinStatus.textContent = "";
    showScreen("screen-civilian-login");
  }, 1500);
}

// ---------- CREATE ACCOUNT FLOW (OFFICER + CIVILIAN) ----------

const createModalBackdrop = document.getElementById("create-modal-backdrop");
const createModalClose = document.getElementById("create-modal-close");
const createModalTitle = document.getElementById("create-modal-title");

const createNameInput = document.getElementById("create-name");
const createAgeInput = document.getElementById("create-age");
const createDobInput = document.getElementById("create-dob");
const createAddressInput = document.getElementById("create-address");
const createPincodeInput = document.getElementById("create-pincode");
const createPhoneInput = document.getElementById("create-phone");

const createSendOtpBtn = document.getElementById("create-send-otp");
const createOtpStatus = document.getElementById("create-otp-status");

const createPinInput = document.getElementById("create-pin");
const createPinConfirmInput = document.getElementById("create-pin-confirm");
const createPinError = document.getElementById("create-pin-error");
const createEnterFull = document.getElementById("create-enter-full");
const createPinOk = document.getElementById("create-pin-ok");

const createFormWarning = document.getElementById("create-form-warning");
const createAccountConfirmBtn = document.getElementById(
  "create-account-confirm-btn",
);

let createRole = "civilian"; // 'civilian' or 'officer'
let createOtpVerified = false;

// OTP dialog elements
const otpDialogBackdrop = document.getElementById("otp-dialog-backdrop");
const otpDialogClose = document.getElementById("otp-dialog-close");
const otpDialogTitle = document.getElementById("otp-dialog-title");
const otpInput = document.getElementById("otp-input");
const otpDialogWarning = document.getElementById("otp-dialog-warning");
const otpDialogVerifyBtn = document.getElementById("otp-dialog-verify-btn");

function openCreateModal(role) {
  const t = translations[currentLang];
  createRole = role;
  // role-specific title
  createModalTitle.textContent =
    role === "officer" ? t.createTitleOfficer : t.createTitleCivil;

  // clear all fields
  createNameInput.value = "";
  createAgeInput.value = "";
  createDobInput.value = "";
  createAddressInput.value = "";
  createPincodeInput.value = "";
  createPhoneInput.value = "";
  createPinInput.value = "";
  createPinConfirmInput.value = "";
  createOtpVerified = false;

  createOtpStatus.textContent = "";
  createOtpStatus.style.color = "";
  createPinError.textContent = "";
  createEnterFull.textContent = "";
  createPinOk.textContent = "";
  createFormWarning.textContent = "";

  createModalBackdrop.classList.add("show");
}

function closeCreateModal() {
  createModalBackdrop.classList.remove("show");
}

// OTP dialog open/close
function openOtpDialog() {
  const t = translations[currentLang];
  otpDialogTitle.textContent = t.otpDialogTitle;
  otpInput.value = "";
  otpDialogWarning.textContent = "";
  otpDialogBackdrop.classList.add("show");
  otpInput.focus();
}

function closeOtpDialog() {
  otpDialogBackdrop.classList.remove("show");
}

// Officer "Create account" button
const officerCreateBtn = document.getElementById("officer-create-btn");
if (officerCreateBtn) {
  officerCreateBtn.addEventListener("click", () => {
    openCreateModal("officer");
  });
}

// Civilian "Create account" button
const civilCreateBtn = document.getElementById("civil-create-btn");
if (civilCreateBtn) {
  civilCreateBtn.addEventListener("click", () => {
    openCreateModal("civilian");
  });
}

// Close create modal on X or backdrop
createModalClose.addEventListener("click", closeCreateModal);
createModalBackdrop.addEventListener("click", (e) => {
  if (e.target === createModalBackdrop) {
    closeCreateModal();
  }
});

// SEND OTP click -> open small OTP dialog
createSendOtpBtn.addEventListener("click", () => {
  openOtpDialog();
});

// OTP dialog close
otpDialogClose.addEventListener("click", closeOtpDialog);
otpDialogBackdrop.addEventListener("click", (e) => {
  if (e.target === otpDialogBackdrop) {
    closeOtpDialog();
  }
});

// OTP verify: accept any 4-digit number
otpDialogVerifyBtn.addEventListener("click", () => {
  const t = translations[currentLang];
  const code = otpInput.value.trim();
  if (!/^\d{4}$/.test(code)) {
    otpDialogWarning.textContent = t.otpDialogError;
    otpDialogWarning.style.color = "#ff5252";
    return;
  }
  // mark verified
  createOtpVerified = true;
  closeOtpDialog();
  createOtpStatus.textContent = t.createOtpVerified;
  createOtpStatus.style.color = "#4caf50";
});

otpInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    otpDialogVerifyBtn.click();
  }
});

// restrict numeric fields
createPincodeInput.addEventListener("input", () => {
  createPincodeInput.value = createPincodeInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
});
createPhoneInput.addEventListener("input", () => {
  createPhoneInput.value = createPhoneInput.value
    .replace(/\D/g, "")
    .slice(0, 10);
});
createPinInput.addEventListener("input", () => {
  createPinInput.value = createPinInput.value.replace(/\D/g, "").slice(0, 6);
  validateCreatePin();
});
createPinConfirmInput.addEventListener("input", () => {
  createPinConfirmInput.value = createPinConfirmInput.value
    .replace(/\D/g, "")
    .slice(0, 6);
  validateConfirmCreatePin();
});

function validateCreatePin() {
  const t = translations[currentLang];
  const p = createPinInput.value.trim();

  if (p.length !== 6) {
    createPinError.textContent = t.createPinError;
    createEnterFull.textContent = "";
    createPinOk.textContent = "";
    return;
  }
  // PIN ok, allow reconfirm
  createPinError.textContent = "";
  // when reconfirm is active, show red "enter full password"
  if (createPinConfirmInput.value.trim().length === 0) {
    createEnterFull.textContent = t.createEnterFullPassword;
  }
}

function validateConfirmCreatePin() {
  const t = translations[currentLang];
  const p1 = createPinInput.value.trim();
  const p2 = createPinConfirmInput.value.trim();

  if (p2.length === 0) {
    createPinOk.textContent = "";
    return;
  }

  // from when reconfirm is active till correct, show red text
  if (p1.length !== 6 || p1 !== p2) {
    createEnterFull.textContent = t.createEnterFullPassword;
    createEnterFull.style.color = "#ff5252";
    createPinOk.textContent = "";
  } else {
    // both same -> green confirmed, hide red text
    createEnterFull.textContent = "";
    createPinOk.textContent = t.createPinConfirmed;
    createPinOk.style.color = "#4caf50";
  }
}

// Final "Create account" click
createAccountConfirmBtn.addEventListener("click", async () => {
  const t = translations[currentLang];

  // basic validation (age optional)
  if (
    !createNameInput.value.trim() ||
    !createDobInput.value.trim() ||
    !createAddressInput.value.trim() ||
    !createPincodeInput.value.trim() ||
    !createPhoneInput.value.trim()
  ) {
    createFormWarning.style.color = "#ff7043";
    createFormWarning.textContent = t.createFormError;
    return;
  }

  if (!createOtpVerified) {
    createFormWarning.style.color = "#ff7043";
    createFormWarning.textContent = t.createFormError;
    return;
  }

  const pin = createPinInput.value.trim();
  const pin2 = createPinConfirmInput.value.trim();
  if (!/^\d{6}$/.test(pin) || pin !== pin2) {
    createFormWarning.style.color = "#ff7043";
    createFormWarning.textContent = t.createPinError;
    return;
  }

  createFormWarning.textContent = "";

  const phone = createPhoneInput.value.trim();
  const ageVal =
    createAgeInput.value.trim() === ""
      ? null
      : parseInt(createAgeInput.value.trim(), 10);

  try {
    if (createRole === "officer") {
      // generate 8-digit official ID
      const officialId = String(
        Math.floor(10000000 + Math.random() * 90000000),
      );

      alert(
        translations[currentLang].officialIdPopupTitle +
          "\n\n" +
          translations[currentLang].officialIdPopupText +
          officialId,
      );

      // IMPORTANT: change table name here if your real table is officer_login
      const { error } = await supabase.from("officers").insert({
        name: createNameInput.value.trim(),
        age: ageVal,
        dob: createDobInput.value.trim(),
        address: createAddressInput.value.trim(),
        pincode: createPincodeInput.value.trim(),
        phone: phone,
        pin: pin,
        official_id: officialId,
        role: "Forest Officer",
      });

      if (error) {
        console.error("Officer insert error:", error);
        createFormWarning.style.color = "#ff7043";
        createFormWarning.textContent =
          (error.message || "") + " (" + t.officerLoginFailed + ")";
        return;
      }
    } else {
      // civilian
      // IMPORTANT: change table name here if your real table is civilian_login
      const { error } = await supabase.from("civilians").insert({
        name: createNameInput.value.trim(),
        age: ageVal,
        dob: createDobInput.value.trim(),
        address: createAddressInput.value.trim(),
        pincode: createPincodeInput.value.trim(),
        phone: phone,
        pin: pin,
        role: "Civilian",
      });

      if (error) {
        console.error("Civilian insert error:", error);
        createFormWarning.style.color = "#ff7043";
        createFormWarning.textContent =
          (error.message || "") + " (" + t.civilLoginFailed + ")";
        return;
      }
    }

    createFormWarning.style.color = "#4caf50";
    createFormWarning.textContent = t.createAccountSaved;

    setTimeout(() => {
      closeCreateModal();
      if (createRole === "officer") {
        screenStack = ["screen-roles"];
        showScreen("screen-officer-login");
      } else {
        screenStack = ["screen-roles"];
        showScreen("screen-civilian-login");
      }
    }, 1200);
  } catch (e) {
    console.error("Create account exception:", e);
    createFormWarning.style.color = "#ff7043";
    createFormWarning.textContent =
      (e.message || "Unknown error") +
      " " +
      (createRole === "officer"
        ? t.officerLoginFailed
        : t.civilLoginFailed);
  }
});


/* Zone feed logic */
const gallery = document.getElementById("officer-gallery");
const zoneTitleBar = document.getElementById("zone-title");
const zoneThermalImg = document.getElementById("zone-thermal-img");
const zoneRgbImg = document.getElementById("zone-rgb-img");
const zoneSpecImg = document.getElementById("zone-spec-img");
const audioToggleBtn = document.getElementById("audio-toggle-btn");
const audioStatusText =
  document.getElementById("audio-status-text");
const sendWarningBtn =
  document.getElementById("send-warning-btn");

let currentZone = null;
let currentZoneAudio = null;
let audioPlaying = false;

function stopZoneAudio() {
  const t = translations[currentLang];
  if (currentZoneAudio) {
    currentZoneAudio.pause();
    currentZoneAudio.currentTime = 0;
  }
  audioPlaying = false;
  audioToggleBtn.textContent = t.audioMutedButton;
  audioStatusText.textContent = t.audioMutedText;
}

if (gallery) {
  gallery.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const zone = tile.dataset.zone;
      const thermal = tile.dataset.thermal;
      const rgb = tile.dataset.rgb;
      const spec = tile.dataset.spec;
      const audio = tile.dataset.audio;

      currentZone = parseInt(zone || "0", 10);
      const t = translations[currentLang];
      zoneTitleBar.style.display = "block";
      zoneTitleBar.dataset.zoneNumber = zone;
      zoneTitleBar.textContent =
        t.zoneTitlePrefix +
        " " +
        zone +
        " " +
        t.zoneTitleSuffix;

      zoneThermalImg.src = thermal;
      zoneRgbImg.src = rgb || thermal;
      zoneSpecImg.src = spec || "sr.png";

      stopZoneAudio();
      if (audio) {
        currentZoneAudio = new Audio(audio);
        currentZoneAudio.loop = true;
      } else {
        currentZoneAudio = null;
      }

      showScreen("screen-zone-feed");
    });
  });
}

audioToggleBtn.addEventListener("click", () => {
  const t = translations[currentLang];
  if (!currentZoneAudio) {
    audioStatusText.textContent = t.audioNoSource;
    return;
  }
  if (audioPlaying) {
    stopZoneAudio();
  } else {
    currentZoneAudio.play().catch(() => { });
    audioPlaying = true;
    audioToggleBtn.textContent = t.audioOnButton;
    audioStatusText.textContent = t.audioOnText;
  }
});

/* Warning modal */
const modalBackdrop =
  document.getElementById("warning-modal-backdrop");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalTitleText = document.getElementById("modal-title-text");
const secretKeyInput =
  document.getElementById("secret-key-input");
const modalWarningText =
  document.getElementById("modal-warning-text");
const modalSendBtn = document.getElementById("modal-send-btn");
const modalFormContent =
  document.getElementById("modal-content-form");
const modalSuccessContent = document.getElementById(
  "modal-content-success",
);
const successTextMsg =
  document.getElementById("success-text-msg");

function openWarningModal() {
  const t = translations[currentLang];
  modalFormContent.style.display = "block";
  modalSuccessContent.style.display = "none";
  modalWarningText.textContent = "";
  secretKeyInput.value = "";
  modalTitleText.textContent = t.modalTitle;
  secretKeyInput.placeholder = t.modalPlaceholder;
  modalSendBtn.textContent = t.modalSendBtn;
  modalBackdrop.classList.add("show");
  secretKeyInput.focus();
}

function closeWarningModal() {
  modalBackdrop.classList.remove("show");
}

if (sendWarningBtn)
  sendWarningBtn.addEventListener("click", openWarningModal);

if (modalCloseBtn)
  modalCloseBtn.addEventListener("click", closeWarningModal);

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeWarningModal();
});

secretKeyInput.addEventListener("input", () => {
  if (secretKeyInput.value.length > 8) {
    secretKeyInput.value = secretKeyInput.value.slice(0, 8);
  }
});

modalSendBtn.addEventListener("click", () => {
  const t = translations[currentLang];
  const key = secretKeyInput.value.trim();
  if (key.length === 0) {
    modalWarningText.textContent = t.modalEmptyKey;
    return;
  }

  modalFormContent.style.display = "none";
  modalSuccessContent.style.display = "block";
  successTextMsg.textContent = t.modalSuccessText;
  modalWarningText.textContent = "";
});

secretKeyInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") modalSendBtn.click();
});

const themeSwitch = document.getElementById("theme-switch");
document.body.classList.remove("light-theme");

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
  }
});

// NEW: logout button behaviour
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    screenStack = ["screen-roles"];
    const zt = document.getElementById("zone-title");
    zt.style.display = "none";
    zt.textContent = "";
    delete zt.dataset.zoneNumber;
    showScreen("screen-roles", false);
  });
}

updateNavButtons();

window.testSupabase = async () => {
  const { data, error } = await supabase
    .from("officers")
    .select("*")
    .limit(1);
  console.log("testSupabase officers:", { data, error });
};
