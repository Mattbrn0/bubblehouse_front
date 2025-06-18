import CardItem from "./CardItem";
import PropTypes from "prop-types";

export default function SectionBlock({ title, items = [] }) {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3 px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-sm text-purple-500 hover:underline">Voir tout</button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <CardItem 
            key={index}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
}

SectionBlock.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};

