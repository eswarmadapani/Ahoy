import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { Image, Send, X } from "lucide-react";
import { getThemeColors } from "../constants/themeConfig";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { theme } = useThemeStore();
  const colors = getThemeColors(theme);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className={`p-4 w-full border-t ${colors.inputBorder} ${colors.inputBg}`}>
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className={`w-20 h-20 object-cover rounded-lg border-2 ${colors.inputBorder} shadow-md`}
            />
            <button
              onClick={removeImage}
              className={`absolute -top-2 -right-2 size-6 rounded-full bg-gradient-to-r ${colors.accentPrimary} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3 text-white" />
            </button>
          </div>
          <p className={`text-xs ${colors.textTertiary}`}>Ready to send</p>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="flex-1 flex gap-2 items-center">
          {/* Text Input */}
          <input
            type="text"
            className={`flex-1 ${colors.inputBg} border ${colors.inputBorder} rounded-xl px-4 py-2.5 ${colors.textPrimary} placeholder-${colors.textTertiary} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
            style={{
              focusRingColor: colors.accentPrimary,
            }}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className={`hidden sm:flex p-2.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              imagePreview
                ? `bg-gradient-to-r ${colors.accentPrimary} text-white shadow-md`
                : `${colors.inputBg} ${colors.textTertiary} hover:${colors.textPrimary}`
            }`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-2.5 rounded-xl bg-gradient-to-r ${colors.accentPrimary} text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;