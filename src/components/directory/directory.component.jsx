import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

const Directory = ({categories}) => (
    <div className="categories-container">
      {categories.map((categoryItem) => (
        <CategoryItem key={categoryItem.id} item={categoryItem} />
      ))}
    </div>
);

export default Directory;