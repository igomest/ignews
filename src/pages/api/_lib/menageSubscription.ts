//Salvar inscrição no banco de dados
export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
) {
   // Buscar o usuário no FaunaDB com o ID {stripe.customer.id}
   // Salvar os dados da subscription no FaunaDB
   console.log(subscriptionId, customerId)
} 