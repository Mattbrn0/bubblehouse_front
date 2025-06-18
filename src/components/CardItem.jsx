import PropTypes from "prop-types";

export default function CardItem({ image, title }) {
  return (
    <div className="min-w-[150px] h-[200px] rounded-lg overflow-hidden shadow-md bg-white">
      <div className="h-[120px] overflow-hidden">
        <img
          src={image}
          alt={title || "Méditation"}
          className="w-full h-full object-cover"
        />
      </div>
      {title && (
        <div className="p-2">
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
      )}
    </div>
  );
}

CardItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
};