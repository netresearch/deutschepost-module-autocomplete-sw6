<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Service;

use PostDirekt\Sdk\Autocomplete\Authentication\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Exception\ServiceException;
use Psr\Log\LoggerInterface;

/**
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 *
 * @see     https://www.netresearch.de/
 */
class AuthenticationService
{
    public function __construct(
        private readonly ModuleConfig $config,
        private readonly ServiceFactoryInterface $serviceFactory,
        private readonly LoggerInterface $logger
    ) {
    }

    /**
     * Fetch Authentication Token for Autocomplete API
     *
     * @throws \RuntimeException
     */
    public function fetchToken(string $salesChannelId): string
    {
        $apiUser = $this->config->getApiUser($salesChannelId);
        $apiPassword = $this->config->getApiPassword($salesChannelId);

        try {
            $authService = $this->serviceFactory->createAuthenticationService($apiUser, $apiPassword, $this->logger);
            $token = $authService->authenticate();
        } catch (ServiceException) {
            throw new \RuntimeException('Unable to fetch token');
        }

        return $token->getAccessToken();
    }
}
