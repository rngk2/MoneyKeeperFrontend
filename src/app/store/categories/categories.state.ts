import { CategoryOverview } from "../../../api/api.generated";
import ICategory from "../../entities/category.entity";

export default interface CategoriesState {
  categories: ICategory[];
  overview: CategoryOverview[];
  earningsOverview?: CategoryOverview;
}
