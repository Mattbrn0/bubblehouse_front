import PropTypes from 'prop-types';
import { MessageSquareText } from 'lucide-react';

export default function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-25 right-5 bg-purple-400 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      aria-label="Open chat"
    >
      <MessageSquareText className="w-6 h-6 text-white" />
       </button>
  );
}

ChatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};