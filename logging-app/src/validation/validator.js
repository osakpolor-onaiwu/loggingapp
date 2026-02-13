const  joi= require('joi');


export function validate_schema(spec, data, optional_configuration){
    const {error, value} = spec.validate(data,{
        allowUnknown: true,
        stripUnknown: true,
        errors: {
            wrap: {
                label: ''
            }
         },
         ...optional_configuration
        }
    );

    if(error) throw new Error(error.message);
    return value
}