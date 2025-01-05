import { motion } from "framer-motion";

interface CategoryHeaderProps {
  name: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name }) => {
  return (
    <motion.div
      className="py-24 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {name}
      </motion.h1>
      <motion.p
        className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Navega a través de nuestra amplia gama de productos y encuentra tus
        favoritos.
      </motion.p>
    </motion.div>
  );
};
