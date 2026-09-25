// El estimador se muestra solo cuando NEXT_PUBLIC_ESTIMADOR_ACTIVO=true (se lee al compilar)
export const estimadorActivo = process.env.NEXT_PUBLIC_ESTIMADOR_ACTIVO === 'true'
