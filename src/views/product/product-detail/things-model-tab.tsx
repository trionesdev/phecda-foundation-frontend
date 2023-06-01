import {Link} from "react-router-dom";
import styles from "./product-detail.module.less"
import {FC} from "react";
import {RoutesConstants} from "../../../router/routes.constants";

type ThingsModelTabProps = {
    product: any
}

const ThingsModelTab: FC<ThingsModelTabProps> = ({product}) => {
    return <div className={styles.thingsModelTab}>
        <div className={styles.thingsModelTabPrompt}>当前展示的是已发布到线上的功能定义，如需修改，<Link
            to={RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(product?.id)}>请点击</Link></div>
    </div>
}
export default ThingsModelTab