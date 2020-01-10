<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Service;

use PostDirekt\Sdk\Autocomplete\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Exception\ServiceException;
use Psr\Log\LoggerInterface;

/**
 * Class AuthenticationService
 *
 * @package  PostDirekt\Autocomplete\Service
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 * @link     https://www.netresearch.de/
 */
class AuthenticationService
{
    /**
     * @var ModuleConfig
     */
    private $config;

    /**
     * @var ServiceFactoryInterface
     */
    private $authService;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * AuthenticationService constructor.
     *
     * @param ModuleConfig $config
     * @param ServiceFactoryInterface $authService
     * @param LoggerInterface $logger
     */
    public function __construct(
        ModuleConfig $config,
        ServiceFactoryInterface $authService,
        LoggerInterface $logger
    ) {
        $this->config = $config;
        $this->authService = $authService;
        $this->logger = $logger;
    }

    /**
     * Fetch Authentication Token for Autocomplete API
     *
     * @param $salesChannelId
     * @return string
     * @throws \RuntimeException
     */
    public function fetchToken($salesChannelId): string
    {
        $apiUser = $this->config->getApiUser($salesChannelId);
        $apiPassword = $this->config->getApiPassword($salesChannelId);
        try {
            $authService = $this->authService->createAuthenticationService($this->logger);
            $token = $authService->authenticate($apiUser, $apiPassword);
        } catch (ServiceException $exception) {
            throw new \RuntimeException('Unable to fetch token');
        }

        return $token;
    }
}
