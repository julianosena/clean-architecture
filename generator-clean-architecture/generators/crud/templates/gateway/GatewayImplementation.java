package <%= pack %>.gateway.<%= tecnologyType %>.<%= tecnologyValue %>;

import <%= pack %>.domain.<%= domainClassName %>;
import <%= pack %>.exception.<%= operationName %>GatewayException;
import <%= pack %>.gateway.<%= operationName %><%= domainClassName %>Gateway;

public class Create<%= domainClassName %><%= tecnologyType %>Gateway implements <%= operationName %><%= domainClassName %>Gateway {

    private <%= domainClassName %>Repository repository;

    @Autowired
    public class <%= operationName %><%= domainClassName %><%= tecnologyValue %>Gateway(<%= domainClassName %>Repository repository){
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