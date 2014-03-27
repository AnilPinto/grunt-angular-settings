angular.module('auth').constant('authSettings', {
    "sessionTtl": 500,
    "productDataAuthStateRequired": "AuthenticatedVerified",
    "stateLevels": {
        "Unauthenticated": 0,
        "Identified": 1,
        "IdentifiedVerified": 2,
        "Authenticated": 3,
        "AuthenticatedVerified": 4
    },
    "authSessionEvents": {
        "end": {
            "authState": "Unauthenticated",
            "uiState": "login"
        },
        "timeout": {
            "authState": "Identified",
            "uiState": "auth.success"
        }
    }
});
angular.module('productizataion').constant('productizataionSettings', {
    "sessionTtl": 700,
    "productDataAuthStateRequired": "AuthenticatedPending",
    "stateLevels": {
        "Unauthenticated": 1234,
        "Identified": 1,
        "IdentifiedVerified": 2,
        "Authenticated": 3,
        "AuthenticatedVerified": 4
    },
    "productizataionSessionEvents": {
        "end": {
            "authState": "Unauthenticated",
            "uiState": "login"
        },
        "timeout": {
            "authState": "Identified",
            "uiState": "product.State"
        }
    }
});
