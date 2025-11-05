import { CaretLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const TermsAndPrivacy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen bg-flesh text-[#5A3921] font-['League_Spartan'] flex flex-col items-center relative px-6 py-10 overflow-y-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate("/auth/signup")}
        className="absolute top-6 left-6 bg-[#C4703D] text-white rounded-full p-3 hover:bg-[#b16435] transition"
      >
        <CaretLeftIcon size={22} weight="bold" />
      </button>

      {/* Terms and Conditions */}
      <div className="mt-16 max-w-md w-full bg-[#FFF5EC] rounded-[20px] shadow-md p-6 mb-10">
        <h1 className="text-[#A0561D] text-[22px] font-bold mb-1">
          Pawlar Terms and Conditions
        </h1>
        <p className="text-sm text-[#A0561D] mb-4">Last Updated: November 2025</p>

        <p className="text-[16px] leading-relaxed mb-4">
          Welcome to Pawlar! These Terms and Conditions outline the rules and guidelines for using our mobile and web
          application. By creating an account or using Pawlar’s services, you agree to comply with and be bound by the following terms.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">1. About Pawlar</h2>
        <p className="mt-1">
          Pawlar is a smart pet management system that helps pet owners conveniently monitor and care for their pets.
          Through the Pawlar collar and app integration, users can:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Track their pet’s location in real time</li>
          <li>Manage access to smart devices (e.g., smart door, smart feeder)</li>
          <li>View and edit their pet’s information securely</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">2. Account Registration</h2>
        <p className="mt-1">
          To use Pawlar’s features, you must create an account using a valid name, email address, and password. You agree to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Provide accurate and complete information during registration</li>
          <li>Keep your login credentials private and secure</li>
          <li>Notify Pawlar immediately if you suspect unauthorized access</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">3. Personal Information</h2>
        <p className="mt-1">
          By using Pawlar, you consent to the collection and use of personal data, including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Name and email address (for account creation and communication)</li>
          <li>Pet details (for device pairing and monitoring)</li>
          <li>Location data (to enable pet tracking features)</li>
        </ul>
        <p className="mt-2">
          Your data is used only for Pawlar’s intended functions and will not be shared or sold to third parties.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">4. Smart Device Usage</h2>
        <p className="mt-1">
          The Pawlar collar, smart door, and feeder are designed to assist owners in caring for their pets responsibly.
          By using these devices, you agree that:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>You are responsible for monitoring your pet’s safety and behavior</li>
          <li>Pawlar is not liable for any damage, injury, or loss from misuse</li>
          <li>Connectivity may depend on stable internet or Bluetooth</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">5. App Access and Availability</h2>
        <p className="mt-1">
          Pawlar strives to keep the app and connected devices available at all times, but occasional interruptions may occur due to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Maintenance or updates</li>
          <li>Connectivity issues</li>
          <li>Hardware or software malfunctions</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">6. Restrictions</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Reverse engineer, modify, or resell any part of Pawlar</li>
          <li>Misuse features for illegal or harmful purposes</li>
          <li>Interfere with Pawlar’s operation or servers</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">7. Limitation of Liability</h2>
        <p className="mt-1">
          Pawlar and its developers shall not be responsible for data loss, device malfunction due to misuse, or harm resulting from inaccurate tracking data. Use of the app and devices is at your own risk.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">8. Updates to Terms</h2>
        <p className="mt-1">
          Pawlar may update these Terms from time to time. Continued use means you accept the revised terms once posted.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">9. Contact Us</h2>
        <p className="mt-1">
          For questions or concerns, contact us at <span className="font-semibold">support@pawlar.ph</span>.
        </p>
      </div>

      {/* Privacy Policy */}
      <div className="max-w-md w-full bg-[#FFF5EC] rounded-[20px] shadow-md p-6 mb-10">
        <h1 className="text-[#A0561D] text-[22px] font-bold mb-1">Pawlar Privacy Policy</h1>
        <p className="text-sm text-[#A0561D] mb-4">Last Updated: November 2025</p>

        <p className="text-[16px] leading-relaxed mb-4">
          This Privacy Policy explains how we collect, use, and protect your personal information when you use our app and connected smart collar devices.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Personal Information: Your name, email address, and password</li>
          <li>Pet Information: Your pet’s name, breed, and basic details</li>
          <li>Location Data: Your pet’s real-time location from the smart collar</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Allow management of smart devices</li>
          <li>Display your pet’s location for safety tracking</li>
          <li>Improve app performance and new features</li>
          <li>Communicate important updates</li>
        </ul>

        <h2 className="text-[#A0561D] font-bold mt-4">3. Data Sharing and Security</h2>
        <p className="mt-1">
          We do not sell or share your personal data. All information is encrypted and accessed only by authorized staff when needed for support.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">4. User Control</h2>
        <p className="mt-1">
          You can update or delete your information anytime. Deleting your account permanently removes all associated data.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">5. Children’s Privacy</h2>
        <p className="mt-1">
          Pawlar is not intended for children under 13. We do not knowingly collect personal information from them.
        </p>

        <h2 className="text-[#A0561D] font-bold mt-4">6. Updates to This Policy</h2>
        <p className="mt-3">
          We may update this policy from time to time. Users will be notified of major changes through the app or email.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center py-2 text-gray-500 text-sm">
        <p>&copy; 2025 Pawlar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndPrivacy;
