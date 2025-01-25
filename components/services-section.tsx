import ServiceCard from "./service-card";

const Services = () => {
  const services = [
    {
      img_url:
        "https://ucarecdn.com/c7595732-2521-4391-bbcb-c1f557a44de6/fantasma.png",
      title: "Tu compra es fácil y rápida",
      description:
        "Entregas disecretas, solicita tu producto y sigue tu pedido.",
    },
    {
      img_url:
        "https://ucarecdn.com/26ea639e-367f-46af-8ce1-7c081508bff5/cosplayer.png",
      title: "Multiples Métodos de pago",
      description: "Paga por transferencia o efectivo en cualquier moneda.",
    },
    {
      img_url:
        "https://ucarecdn.com/fb6f5a2b-18a8-4cc1-a42d-ae8e62f82dd2/mensajero.png",
      title: "Tu envío es rápido",
      description: "Envío estimado de 2 a 10 días hábiles.",
    },
    {
      img_url:
        "https://ucarecdn.com/702b64ac-9769-468f-85f2-66b5980c1b32/hongos.png",
      title: "Compra segura y garantizada",
      description: "Te garantiza transacciones seguras.",
    },
  ];
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 sm:gap-6 py-8 px-5 bg-[#fcaa2a]">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          index={index}
          title={service.title}
          description={service.description}
          img_url={service.img_url}
        />
      ))}
    </div>
  );
};

export default Services;
