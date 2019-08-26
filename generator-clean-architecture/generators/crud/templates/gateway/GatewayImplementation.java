package <%= gatewayImplementationPackage %>;

import <%= domainPackage %>.domain.<%= domainClassName %>;
import <%= gatewayPackage %>.exception.<%= operationName %>GatewayException;
import <%= gatewayPackage %>.<%= operationName %><%= domainClassName %>Gateway;

public class Create<%= domainClassName %><%= gatewayImplementationTecnology %>Gateway implements <%= operationName %><%= domainClassName %>Gateway {

    private <%= domainClassName %>Repository repository;

    @Autowired
    public class <%= operationName %><%= domainClassName %><%= gatewayImplementationTecnology %>Gateway(<%= domainClassName %>Repository repository){
        this.repository = repository;
    }

    public <%= domainClassName %> execute(<%= domainClassName %> domain) throws <%= operationName %>GatewayException {
        try {
            this.repository.save(domain);
        } catch (Exception e){
            throw new <%= operationName %>GatewayException("Problems in <%= operationName %> <%= domainClassName %> process", e);
        }
    }

}